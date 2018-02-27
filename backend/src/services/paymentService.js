const stripe = require('stripe')(process.env.HK01_PAYMENT_STRIPE_SK)
const {logger} = require('../util/logger')
const cardValidator = require('card-validator')
const orderRepository = require('../repository/orderRepository')

// some private function

function isCardAE(cardNumber) {
  return cardValidator.number(cardNumber).card.type === 'american-express'
}

const GATEWAY_A_SUPPORTED_CCY = ['USD', 'AUD', 'EUR', 'JPY', 'CNY']
function isCurrencyFitGatewayA(currency) {
  return GATEWAY_A_SUPPORTED_CCY.includes(currency)
}

function isGatewayA(req) {
  return isCardAE(req.payment.ccNumber) || isCurrencyFitGatewayA(req.order.currency)
}

module.exports = {
  async createPayment(req) {
    const gateway = isGatewayA(req) ? 'gateway_a' : 'gateway_b'
    const stripePaymentInfo = {
      currency: req.order.currency,
      amount: Math.trunc(req.order.price * 100),
      source: {
        object: 'card',
        number: req.payment.ccNumber,
        exp_month: req.payment.ccExpire.month,
        exp_year: req.payment.ccExpire.year,
        cvc: req.payment.ccCCV,
        name: req.payment.ccHolderName,
      },
      description: `Charge for ${req.payment.ccHolderName} with amount ${req.order.price}`,
    }
    // I have to turn off setting in stripe for it to work!
    const stripePaymentResult = await stripe.charges.create(stripePaymentInfo)
    const paymentRecord = {
      customerName: req.order.fullname,
      paymentRefCode: stripePaymentResult.id,
      phoneNumber: req.order.phoneNumber,
      currency: req.order.currency,
      price: req.order.price,
      gateway: gateway,
      createdAt: Date.now(),
      rawResponse: stripePaymentResult,
    }
    await orderRepository.insertOne(paymentRecord)
    return paymentRecord
  },
  async getPayment(refCode) {
    return await orderRepository.findByRefCode(refCode)
  },
}

// @flow
const cardValidator = require('card-validator')
const orderRepository = require('../repository/orderRepository')
const stripeService = require('./stripeService')

type Order = {
  fullname: string,
  phoneNumber: string,
  currency: string,
  price: number
}

type Expire = {
  year: number,
  month: number
}

type Payment = {
  ccHolderName: string,
  ccNumber: string,
  ccExpire: Expire,
  ccCCV: number
}

type CreatePaymentRequest = {
  order: Order,
  payment: Payment
}

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
  async createPayment(req: CreatePaymentRequest) {
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
    const stripePaymentResult = await stripeService.create(stripePaymentInfo)
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
  async getPayment(refCode: string) {
    return await orderRepository.findByRefCode(refCode)
  },
}

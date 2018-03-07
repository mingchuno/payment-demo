// @flow
const stripe = require('stripe')(process.env.HK01_PAYMENT_STRIPE_SK)

module.exports = {
  async create(stripePaymentInfo) {
    return await stripe.charges.create(stripePaymentInfo)
  },
}

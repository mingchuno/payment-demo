// @flow
const stripe = require('stripe')(process.env.HK01_PAYMENT_STRIPE_SK)

module.exports = {
  async create(stripePaymentInfo: Object) {
    return await stripe.charges.create(stripePaymentInfo)
  },
}

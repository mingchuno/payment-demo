const uuidv4 = require('uuid/v4')

module.exports = {
  async create(stripePaymentInfo) {
    return {
      id: uuidv4(),
      data: {
        foo: "bar"
      }
    }
  }
}

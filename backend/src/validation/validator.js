const {checkSchema} = require('express-validator/check')

const ACCEPTED_CURRENCY = ['USD', 'HKD', 'AUD', 'EUR', 'JPY', 'CNY']

module.exports.errorFormatter = function ({location, msg, param, value, nestedErrors}) {
  // Build your resulting errors however you want! String, object, whatever - it works!
  return `${location}[${param}]: ${msg}`
}

module.exports.createPaymentReqValidator = checkSchema({
  'order.fullname': {
    optional: false,
    in: ['body'],
    isAscii: true,
    trim: true,
    isLength: {
      errorMessage: 'Fullname should be between 6-50 chars long',
      // Multiple options would be expressed as an array
      options: {min: 6, max: 50},
    },
  },
  'order.phoneNumber': {
    optional: false,
    in: ['body'],
    isMobilePhone: {
      options: 'any',
    },
    trim: true,
  },
  'order.currency': {
    optional: false,
    in: ['body'],
    isIn: {
      options: [ACCEPTED_CURRENCY],
    },
    trim: true,
  },
  'order.price': {
    optional: false,
    in: ['body'],
    isCurrency: {
      options: {allow_negatives: false, digits_after_decimal: [1, 2]},
    },
  },
  'payment.ccHolderName': {
    optional: false,
    in: ['body'],
    isAscii: true,
    trim: true,
    isLength: {
      errorMessage: 'Fullname should be between 6-50 chars long',
      // Multiple options would be expressed as an array
      options: {min: 6, max: 50},
    },
  },
  'payment.ccNumber': {
    optional: false,
    in: ['body'],
    isCreditCard: true,
  },
  'payment.ccExpire.year': {
    optional: false,
    in: ['body'],
    isNumeric: true,
  },
  'payment.ccExpire.month': {
    optional: false,
    in: ['body'],
    isNumeric: true,
  },
    'payment.ccCCV': {
    optional: false,
    in: ['body'],
    isNumeric: true,
  },
})

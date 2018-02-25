const express = require('express')
const { logger } = require('../util/logger')
const { jsonParser } = require('../middleware/middleware')
const { errorFormatter, createPaymentReqValidator } = require('../validation/validator')
const { validationResult } = require('express-validator/check')
const error = require('../error/error')
const { paymentService } = require('../services/payment-service')

const router = express.Router()

// GET payment details
router.get('/', function (req, res, next) {
  res.status(200).end()
})

// example POST data
// TODO: remove later
const exampleRequestData = {
  order: {
    fullname: 'John Doe',
    phoneNumber: '+852 12345678',
    currency: 'USD',
    price: '1.23',
  },
  payment: {
    ccHolderName: 'John Doe',
    ccNumber: '4111 1111 1111 1111',
    ccExpire: {
      year: 2020,
      month: 2,
    },
    ccCCV: 123,
  },
}

// POST payment
router.post('/', jsonParser, createPaymentReqValidator, function (req, res, next) {
  logger.info('req body:\n%o', req.body)
  const result = validationResult(req)
  if (!result.isEmpty()) {
    logger.warn('invalid request:\n%o', result.mapped())
    throw new error.RequestValidationError(result.formatWith(errorFormatter).array())
  }
  paymentService.createPayment(req.body).then((value) => {
    res.status(200).end()
  })
})

module.exports = router

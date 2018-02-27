const express = require('express')
const {logger} = require('../util/logger')
const {jsonParser} = require('../middleware/middleware')
const {errorFormatter, createPaymentReqValidator} = require('../validation/validator')
const {validationResult} = require('express-validator/check')
const error = require('../error/error')
const {paymentService} = require('../services/payment-service')

/*eslint-disable*/
const router = express.Router()
/* eslint-enable*/

// GET payment details
router.get('/:refCode', async function (req, res, next) {
  const record = await paymentService.getPayment(req.params.refCode)
  if (record) {
    res.json(record)
  } else {
    next(new error.ResourceNotFoundError(req))
  }
})

// POST payment
router.post('/', jsonParser, createPaymentReqValidator, async function (req, res, next) {
  logger.info('req body:\n%o', req.body)
  const result = validationResult(req)
  if (!result.isEmpty()) {
    logger.warn('invalid request:\n%o', result.mapped())
    next(new error.RequestValidationError(result.formatWith(errorFormatter).array()))
  } else {
    const paymentRecord = await paymentService.createPayment(req.body)
    res.json(paymentRecord)
  }
})

module.exports = router

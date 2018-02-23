const express = require('express')
const { logger } = require('../util/logger')
const { jsonParser } = require('../middleware/middleware.js')

const router = express.Router()
const app = express()

// GET payment details
router.get('/', function (req, res, next) {
  res.status(200).end()
})

// POST payment
router.post('/', jsonParser, function (req, res, next) {
  logger.info("req body:%j", req.body)
  res.status(200).end()
})

module.exports = router

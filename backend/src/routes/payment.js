const express = require('express')
const bodyParser = require('body-parser')
const logger = require('../util/logger').logger

const router = express.Router()
const app = express()
// create application/json parser
const jsonParser = bodyParser.json()

// GET payment details
router.get('/', function (req, res, next) {
  res.status(200).end()
})

// POST payment
router.post('/', jsonParser, function (req, res, next) {
  logger.info("req body:", req.body)
  logger.warn("req body:", req.body)
  logger.error("req body:", req.body)
  logger.info("hahaha")
  res.status(200).end()
})

module.exports = router

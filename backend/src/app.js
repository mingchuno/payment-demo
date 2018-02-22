const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')
const payment = require('./routes/payment')

const logger = require('./util/logger').logger
const error = require('./error/error')

const app = express()

app.use(compression())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/api/v1/payment', payment)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(new ResourceNotFoundError(req))
})

// error handler
app.use(function (err, req, res, next) {
  let e = null
  if (err && err instanceof error.BaseError) {
    logger.warn("known error", err)
    e = err
  } else {
    logger.error("unknown server error", err)
    e = new error.UnknownServerError(err.toString())
  }
  res.status(e.statusCode).json(e.toJson())
})

module.exports = app

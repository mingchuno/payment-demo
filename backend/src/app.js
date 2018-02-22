const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')
const index = require('./routes/index')
const users = require('./routes/users')

const logger = require('./util/logger.js').logger
const error = require('./error/error.js')

const app = express()

app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/', index)
app.use('/users', users)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(new ResourceNotFoundError(req))
})

// error handler
app.use(function (err, req, res, next) {
  let e = null
  if (err && err instanceof error.BaseError) {
    logger.warn(err.toString())
    e = err
  } else {
    logger.error(err)
    e = new error.UnknownServerError(err.toString())
  }
  res.status(e.statusCode).json(e.toJson())
})

module.exports = app

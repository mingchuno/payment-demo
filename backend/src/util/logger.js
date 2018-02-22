const winston = require('winston')

const logger = winston.createLogger({
  transports: [
    new(winston.transports.Console)({timestamp: true})
  ],
})

module.exports = {
  logger
}

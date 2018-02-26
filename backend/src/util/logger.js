// const winston = require('winston')
const {createLogger, format, transports} = require('winston')
const {combine, timestamp, printf, splat, colorize} = format

const logger = createLogger({
  format: combine(
    timestamp(),
    colorize(),
    splat(),
    printf(info => {
      return `${info.timestamp} - [${info.level}] ${info.message}`
    })
  ),
  transports: [
    new(transports.Console)(),
  ],
})

module.exports.logger = logger

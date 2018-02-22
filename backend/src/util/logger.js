// const winston = require('winston')
const { createLogger, format, transports } = require('winston')
const { combine, timestamp, label, printf, prettyPrint, simple, json } = format

const loggerFormat = printf((info) => {
    return `${info.timestamp} [${info.level}] ${info.message}`
})

const logger = createLogger({
  format: json(),
  // format: combine(
  //   timestamp(),
  //   prettyPrint(),
  //   simple(),
  //   loggerFormat
  // ),
  transports: [
    new(transports.Console)({colorized: true})
  ],
})

module.exports = {
  logger
}

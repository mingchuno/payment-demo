// @flow
class BaseError extends Error {
  statusCode: number
  name: string
  errorCode: number

  constructor(statusCode: number, errorCode: number, message: string) {
    super(message)
    this.name = this.constructor.name
    this.statusCode = statusCode
    this.errorCode = errorCode
  }

  toJson() {
    return {
      statusCode: this.statusCode,
      errorCode: this.errorCode,
      message: this.message,
    }
  }

  toString() {
    return `statusCode=${this.statusCode}, errorCode=${this.errorCode}, message=${this.message}`
  }
}

class ResourceNotFoundError extends BaseError {
  constructor(req: express$Request) {
    super(404, 10001, `resource not found in server:${req.method}:${req.path}`)
  }
}

class RequestValidationError extends BaseError {
  constructor(message: string) {
    super(400, 10002, `invalid request:${message}`)
  }
}

class UnknownServerError extends BaseError {
  constructor(message: string) {
    super(500, 10101, message)
  }
}

module.exports = {
  BaseError,
  ResourceNotFoundError,
  UnknownServerError,
  RequestValidationError,
}

class BaseError extends Error {
  constructor(statusCode, errorCode, message) {
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
  constructor(req) {
    super(404, 10001, `resource not found in server:${req.method}:${req.path}`)
  }
}

class RequestValidationError extends BaseError {
  constructor(message) {
    super(400, 10002, `invalid request:${message}`)
  }
}

class UnknownServerError extends BaseError {
  constructor(message) {
    super(500, 10101, message)
  }
}

module.exports = {
  BaseError,
  ResourceNotFoundError,
  UnknownServerError,
  RequestValidationError,
}

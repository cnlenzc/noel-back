class HttpError extends Error {
  constructor(message) {
    super(message)
    this.statusCode = 500
    this.name = this.constructor.name
  }
}

class BadRequest extends HttpError {
  constructor(message) {
    super(message)
    this.statusCode = 400
  }
}

class NotFound extends HttpError {
  constructor(message) {
    super(message)
    this.statusCode = 404
  }
}

module.exports = {
  HttpError,
  BadRequest,
  NotFound
}

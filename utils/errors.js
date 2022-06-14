class GeneralError extends Error {
  constructor (message) {
    super()
    this.message = message
  }

  getCode () {
    if (this instanceof BadRequest) {
      return 400
    }

    // target not found
    if (this instanceof NotFound) {
      return 404
    }

    // unauthorized
    if (this instanceof Unauthorized) {
      return 401
    }

    if (this instanceof Forbidden) {
      return 403
    }

    // unexpected error
    return 500
  }
}

class BadRequest extends GeneralError {}
class NotFound extends GeneralError {}
class Unauthorized extends GeneralError {}
class Forbidden extends GeneralError {}

module.exports = {
  GeneralError,
  BadRequest,
  NotFound,
  Unauthorized,
  Forbidden
}

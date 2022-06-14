const { GeneralError } = require('../utils/errors')

const errorHandler = (err, req, res, next) => {
  const errorData = {
    success: false,
    message: err.message || err.stack
  }

  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json(errorData)
  }

  return res.status(500).json(errorData)
}

module.exports = errorHandler

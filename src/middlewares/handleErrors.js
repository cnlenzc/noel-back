const { HttpError } = require('../utils/errors')

const handleErrors = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }

  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      error: {
        statusCode: err.statusCode,
        name: err.name,
        message: err.message
      }
    })
  }

  err = err || new Error('Erro interno')

  console.error(err)

  const error = {
    name: err.name,
    message: err.message,
    stack: (err.stack || '').split('\n'),
    ...(JSON.parse(JSON.stringify(err)))
  }

  return res.status(500).json({ error })
}

module.exports = handleErrors

const { checkToken } = require('../utils/jwt')

function authMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      const error = new Error('No token')
      error.statusCode = 400
      throw error
    }
    const isValid = checkToken(token)
    if (isValid) {
      if (isValid.data.isAdmin) {
        return next()
      }
      const error = new Error('Not Authorized')
      error.statusCode = 401
      throw error
    }
    const error = new Error('Not Authorized')
    error.statusCode = 401
    throw error
    
  } catch(err) {
    next(err)
  }
}

module.exports = authMiddleware
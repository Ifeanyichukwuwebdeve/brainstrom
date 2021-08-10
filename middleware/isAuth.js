const { checkToken } = require('../utils/jwt')

function authMiddleware(req, res, next) {
  // console.log(req.headers)
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      const error = new Error('No token')
      error.statusCode = 400
      throw error
    }
    const isValid = checkToken(token)
    if (isValid) {
      req.isAdmin = isValid.data.isAdmin
      req.isOperator = isValid.data.isOperator
      return next()
    }
    const error = new Error('Not Authorized')
    error.statusCode = 401
    throw error
    
  } catch(err) {
    // console.log(err)
    next(err)
  }
}

module.exports = authMiddleware
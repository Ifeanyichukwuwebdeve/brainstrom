var jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRETKET
const header = {
  typ: 'JWT',
  alg: 'HS512'
}

function generateToken(userId, isOperator, isAdmin) {
  const data = {
    userId,
    isOperator,
    isAdmin
  }

  return jwt.sign({ data }, secret, { expiresIn: '2h' })
}

function decodeToken(token) {
  return jwt.verify(token, secret)
}

function checkToken(token) {
  let decodedToken
  try {
    decodeToken = jwt.verify(token, secret)
    return decodeToken
  } catch (err) {
    return false
  }
}

module.exports = { generateToken, decodeToken, checkToken }
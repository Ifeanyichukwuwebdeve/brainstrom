const bcrypt = require('bcryptjs')
const saltRounds = 10

async function hashPassword(password) {
  return await bcrypt.hash(password, saltRounds)
}

module.exports = hashPassword
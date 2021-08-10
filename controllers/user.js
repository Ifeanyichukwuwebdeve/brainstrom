const User = require('../models/User')

const { validationResult } = require('express-validator')

exports.updateUser = async (req, res, next) => {
  try {
    const userId = req.params.userId
    const { name, email } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.')
      error.statusCode = 422
      error.data = errors.array()
      throw error
    }
    const user = User.findById({ _id: userId })
    user.name = name
    user.email = email
    await user.save()
    res.status(202).json({ message: 'User updated', userInfo: user })
  } catch (error) {
    next(error)
  }
}
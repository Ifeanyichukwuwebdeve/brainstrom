const bcrypt = require('bcryptjs')

const { validationResult } = require('express-validator')

const { 
  auth: hashPassword,
  jwt: { generateToken }
  // mailgun: { sendEmail }
} = require('../utils')

// const io = require('../utils/socket')
const User = require('../models/User')
const Verification = require('../models/Verification')

exports.signUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.')
      error.statusCode = 422
      error.data = errors.array()
      throw error
    }
    const hash = await hashPassword(password)
    const user = new User({
      name,
      email,
      password: hash,
    })
    const savedUser = await user.save()
    if (!savedUser) {
      const error = new Error('User could not be saved')
      error.statusCode = 500
      throw error
    }
    const code = Math.floor(Math.random() * (999999 - 100000) + 100000)
    const verification = new Verification({
      userId: savedUser._id,
      code
    })

    const verify = await verification.save()
    if (!verify) {
      const error = new Error('Verification code could not be saved')
      error.statusCode = 500
      throw error
    }
    const payload = {
      code,
      email
    }
    console.log(payload)
    // await sendEmail(payload)

    // io.getIO().emit('users', { action: 'create', user: savedUser })
    res.status(201).json({ message: 'User created!', savedUser })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    // console.log(err)
    next(err)
  }
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.')
      error.statusCode = 422
      error.data = errors.array()
      throw error
    }
    let loadedUser = await User.findOne({ email })
    if (!loadedUser) {
      const error = new Error('User with such email could not be found.')
      error.statusCode = 401
      throw error
    }
    const isEqual = await bcrypt.compare(password, loadedUser.password)
    if (!isEqual) {
      const error = new Error('Wrong password')
      error.statusCode = 401
      throw error
    }
    const token = generateToken(loadedUser._id.toString(), loadedUser.isOperator, loadedUser.isAdmin)
    let payload = {
      _id: loadedUser._id,
      name: loadedUser.name,
      email: loadedUser.email,
      isAdmin: loadedUser.isAdmin,
      isOperator: loadedUser.isOperator,
      isVerified: loadedUser.isVerified,
      createdAt: loadedUser.createdAt,
      token
    }
    // console.log(payload)
    res.status(200).json(payload)
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    // console.log(err)
    next(err)
  }
}

exports.verify = async (req, res, next) => {
  const { email, code } = req.body

  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.')
      error.statusCode = 422
      error.data = errors.array()
      throw error
    }
    const user = await User.findOne({ email })
    const verify = await Verification.findOne({ userId: user._id })
    if (!user) {
      const error = new Error('User not found')
      error.statusCode = 404
      throw error
    }
    if (verify.code === parseInt(code)) {
      user.isVerified = true
      await user.save()
      res.status(200).json({ message: 'Email verified you can login' })
      return true
    } else {
      const error = new Error('Invalid Code')
      error.statusCode = 400
      throw error
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    // console.log(err)
    next(err)
  }
}

exports.forgottenPassword = async (req, res, next) => {
  const { email } = req.body

  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.')
      error.statusCode = 422
      error.data = errors.array()
      throw error
    }
    const user = await User.findOne({ email })
    if (!user) {
      const error = new Error('User with such email not found')
      error.statusCode = 404
      throw error
    }
    const verify = await Verification.findOne({ userId: user._id })
    if (!verify) {
      const error = new Error('User with id not found')
      error.statusCode = 404
      throw error
    }
    const code = Math.floor(Math.random() * (999999 - 100000) + 100000)
    verify.code = code
    await verify.save()
    const payload = {
      email: user.email,
      code: verify.code
    }
    console.log(payload)
    // await sendEmail(payload)
    res.send('Success')
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    // console.log(err)
    next(err)
  }
}

exports.resetPassword = async (req, res, next) => {
  const { password, code } = req.body

  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.')
      error.statusCode = 422
      error.data = errors.array()
      throw error
    }
    const verify = await Verification.findOne({ code })
    if (!verify) {
      const error = new Error('Code not found')
      error.statusCode = 404
      throw error
    }
    const _id = verify.userId
    const user = await User.findOne({ _id })
    if (!user) {
      const error = new Error('User not found')
      error.statusCode = 404
      throw error
    }
    if (password.length >= 6) {
      const hash = await hashPassword(password)
      user.password = hash
      user.save()
    }
    res.status(201).json({ message: 'Password reset successful!' })
  } catch (err) {
    // console.log((err))
    if (!err.statusCode) {
      err.statusCode = 500
    }
    // console.log(err)
    next(err)
  }
}

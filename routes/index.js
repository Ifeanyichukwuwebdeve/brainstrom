const express = require('express')
const router = express.Router()

// Auth middleware
const isAuthMiddileware = require('../middleware/isAuth')

// Routes const
const auth = require('./auth')
const course = require('./addCourse')
const userProfile = require('./user')

router.use('/auth', auth)
router.use('/user-profile', isAuthMiddileware, userProfile)
router.use('/course', course)
module.exports = router
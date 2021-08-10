const express = require('express')
const router = express.Router()

const auth = require('./auth')
const course = require('./addCourse')

router.use('/auth', auth)
router.use('/course', course)
module.exports = router
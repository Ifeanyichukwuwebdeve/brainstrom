const express = require('express')
const { body } = require('express-validator')
// const { check } = require('express-validator');

const router = express.Router()
const userController = require('../controllers/user')

router.post('/update-user/:userId',
[
  body('name')
    .notEmpty()
    .withMessage('Please add name'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .notEmpty()
    .withMessage('Please add valid email')
], userController.updateUser)

module.exports = router
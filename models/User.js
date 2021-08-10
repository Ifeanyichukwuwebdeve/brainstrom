const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name:{
    type: String,
    required: true,
    minLength: 3,
    maxLength: 200
  },
  email: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 200,
    unique: true,
    match: /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 1200
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isOperator: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })


const User = mongoose.model('users', UserSchema)
module.exports = User
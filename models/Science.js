const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ScienceSchema = new Schema({
  courseName:{
    type: String,
    required: true
  },
  subjects: {
    type: Array,
    require: true
  }
}, { timestamps: true })


const Science = mongoose.model('Sciences', ScienceSchema)
module.exports = Science
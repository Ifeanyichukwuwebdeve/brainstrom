const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArtSchema = new Schema({
  courseName:{
    type: String,
    required: true
  },
  subjects: {
    type: Array,
    require: true
  }
}, { timestamps: true })


const art = mongoose.model('Arts', ArtSchema)
module.exports = art
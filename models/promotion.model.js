const mongoose = require('mongoose')
const Schema = mongoose.Schema
require('mongoose-currency').loadType(mongoose)

const protionSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  price: {
    type: mongoose.Types.Currency,
    required: true,
    min: 0
  }
})


module.exports = mongoose.model('Promotion', protionSchema)

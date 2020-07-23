const mongoose = require('mongoose')
const Schema = mongoose.Schema
require('mongoose-currency').loadType(mongoose)

const dishSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true,
    default: ''
  },
  price: {
    type: mongoose.Types.Currency,
    required: true,
    min: 0
  },
  featured: {
    type: Boolean,
    defaultValue: false
  },
  comments: [{
    type: Schema.Types.ObjectID,
    ref: 'Comment'
  }]
}, {
  timestamps: true
})


module.exports = mongoose.model('Dish', dishSchema)

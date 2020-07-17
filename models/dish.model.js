const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
  comments: [{
    type: Schema.Types.ObjectID,
    ref: 'Comment'
  }]
}, {
  timestamps: true
})


module.exports = mongoose.model('Dish', dishSchema)

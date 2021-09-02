const { Schema, model } = require('mongoose')

module.exports = model('user', new Schema({
  id: {
    type: Number,
    required: true
  },
  lang: {
    type: String,
    required: true
  }
},
  {
    versionKey: false
  }))
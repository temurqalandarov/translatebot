const { Schema, model } = require('mongoose')

module.exports = model('user', new Schema({
  id: {
    type: Number,
    required: true
  },
  lang: String,
  status: {
    type: String,
    required: true,
    enum: ['member', 'kicked']
  },
},
  {
    versionKey: false,
    timestamps: true
  }))
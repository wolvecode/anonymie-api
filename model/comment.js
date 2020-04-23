const Joi = require('joi')
const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  SuggestionID: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  }
})

const Comment = mongoose.model('Comment', commentSchema)

function val(suggestion) {
  const schema = {
    SuggestionID: Joi.any().required(),
    date: Joi.date(),
    title: Joi.string()
      .min(3)
      .required(),
    description: Joi.string()
      .min(3)
      .required()
  }

  return Joi.validate(suggestion, schema)
}

exports.Comment = Comment
exports.validate = val

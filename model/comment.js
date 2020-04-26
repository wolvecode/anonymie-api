const Joi = require('joi')
const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  SuggestionID: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true
  },
  comment: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const Comment = mongoose.model('Comment', commentSchema)

function val(suggestion) {
  const schema = {
    SuggestionID: Joi.any().required(),
    date: Joi.date(),
    comment: Joi.string()
      .min(3)
      .required()
  }

  return Joi.validate(suggestion, schema)
}

exports.Comment = Comment
exports.validate = val

const Joi = require('joi')
const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  SuggestionID: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  stared: {
    type: Boolean,
    required: true,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const Comment = mongoose.model('Comment', commentSchema)
function valComment(comment) {
  const schema = {
    stared: Joi.boolean()
  }
  return Joi.validate(comment, schema)
}

function val(comment) {
  const schema = {
    SuggestionID: Joi.any().required(),
    date: Joi.date(),
    comment: Joi.string()
      .min(3)
      .required()
  }

  return Joi.validate(comment, schema)
}

exports.Comment = Comment
exports.validate = val
exports.val = valComment

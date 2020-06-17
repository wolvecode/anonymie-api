const Joi = require('joi')
const mongoose = require('mongoose')

const suggestionSchema = new mongoose.Schema({
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
  },
  date: {
    type: Date,
    default: Date.now
  }
})

suggestionSchema.index(
  {
    title: 'text',
    description: 'text'
  },
  {
    weights: {
      name: 5,
      description: 1
    }
  }
)

const Suggestion = mongoose.model('Suggestion', suggestionSchema)

function val(suggestion) {
  const schema = {
    title: Joi.string()
      .min(3)
      .required(),
    description: Joi.string()
      .min(3)
      .required(),
    date: Joi.date()
  }

  return Joi.validate(suggestion, schema)
}

exports.Suggestion = Suggestion
exports.validate = val

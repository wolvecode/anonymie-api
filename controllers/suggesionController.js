const { Suggestion, validate } = require('../model/suggestion')

exports.getAllSuggestion = async (req, res, next) => {
  const suggestion = await Suggestion.find()
  res.send(suggestion)
  next()
}

exports.getSuggestionById = async (req, res, next) => {
  const suggestion = await Suggestion.findById(req.params.id)
  if (!suggestion)
    return res
      .status(404)
      .send('The suggestion with the given ID was not found.')
  res.send(suggestion)
  next()
}

exports.createSuggestion = async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let suggestion = new Suggestion({
    title: req.body.title,
    description: req.body.description
  })
  suggestion = await suggestion.save()
  res.send(suggestion)
}

exports.updateSuggestionById = async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const suggestion = await Suggestion.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description
    },
    { new: true }
  )

  res.send(suggestion)
}

exports.deleteSuggestion = async (req, res) => {
  const suggestion = await Suggestion.findByIdAndRemove(req.params.id)

  if (!suggestion)
    return res
      .status(404)
      .send('The suggestion with the given ID was not found.')

  res.send(suggestion)
}

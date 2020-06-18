const { Suggestion, validate } = require('../model/suggestion')

exports.getAllSuggestion = (req, res) => {
  let term = req.body.searchTerm

  if (term) {
    console.log(term)
    Suggestion.find()
      .find({ $text: { $search: term } })
      .exec((err, suggestion) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ suggestion })
      })
  } else {
    Suggestion.find().exec((err, suggestion) => {
      if (err) return res.status(400).json({ success: false, err })
      return res.status(200).json({ suggestion })
    })
  }
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

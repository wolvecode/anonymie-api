const mongoose = require('mongoose')
const axios = require('axios')
const { Comment, validate } = require('../model/comment')
const { Suggestion } = require('../model/suggestion')

exports.getAllComment = async (req, res) => {
  const comment = await Comment.find()
  res.send(comment)
}

exports.getCommentByID = async (req, res) => {
  const comment = await Comment.findById(req.params.id)
  console.log(comment.SuggestionID)
  if (comment) {
    try {
      await axios
        .get('http://localhost:5000/suggestion/' + comment.SuggestionID)
        .then(response => res.json(response))
    } catch (exp) {
      res.send(exp.message)
    }
  } else {
    return res.status(404).send('Invalid ID')
  }
}

exports.createComment = async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const suggestion = await Suggestion.findOne({
    _id: req.body.SuggestionID
  })
  if (!suggestion) return res.status(404).send('Invalid suggestion ID')

  let comment = new Comment({
    SuggestionID: mongoose.Types.ObjectId(req.body.SuggestionID),
    title: req.body.title,
    description: req.body.description
  })

  comment = await comment.save()
  res.send(comment)
}

exports.updateComment = async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let comment = await Comment.findByIdAndUpdate(
    req.params.id,
    {
      SuggestionID: req.body.SuggestionID,
      title: req.body.title,
      description: req.body.description
    },
    { new: true }
  )

  res.send(comment)
}

const mongoose = require('mongoose')
const { Comment, validate } = require('../model/comment')

exports.getAllComment = async (req, res) => {
  const comment = await Comment.find()
  res.send(comment)
}

exports.getCommentByID = async (req, res) => {
  const comment = await Comment.findById(req.params.id)
  if (!comment) res.status(404).send('Invalid ID')
  res.send(comment)
}

exports.createComment = async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

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

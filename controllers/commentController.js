const mongoose = require('mongoose')
const { Comment, validate, val } = require('../model/comment')

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

  let comment = new Comment({
    SuggestionID: mongoose.Types.ObjectId(req.body.SuggestionID),
    comment: req.body.comment
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
      SuggestionID: mongoose.Types.ObjectId(req.body.SuggestionID),
      comment: req.body.comment
    },
    { new: true }
  )
  res.send(comment)
}

exports.staredComment = async (req, res) => {
  const { error } = val(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let comment = await Comment.findByIdAndUpdate(
    req.params.id,
    {
      stared: req.body.stared
    },
    { new: true }
  )
  res.send(comment)
}

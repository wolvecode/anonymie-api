const { Comment, validate } = require('../model/comment')
// const axios = require('axios')
const mongoose = require('mongoose')

exports.getComtBySugId = async (req, res) => {
  const comment = await Comment.find({ SuggestionID: req.params.id })
  if (!comment) res.status(404).send('Invalid ID')
  res.send(comment)
}

exports.createComBySugID = async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let comment = new Comment({
    SuggestionID: mongoose.Types.ObjectId(req.body.SuggestionID),
    comment: req.body.comment
  })
  comment = await comment.save()
  res.send(comment)
}

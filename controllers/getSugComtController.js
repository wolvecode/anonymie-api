const { Suggestion, validate } = require('../model/suggestion')
const { Comment, validate } = require('../model/comment')


exports.getComtSugId = (req, req, next) => {
  const suggestion = await Suggestion.findById(req.params.id)
  if(!suggestion) return res.status(404).send('Suggestion id not found')

  const comment = await Comment.find()
  res.send(comment)
}

exports.createCommentBySugId = (req, res, next) => {
  //get a suggestion id
  //create a comment base on the id
  //save to the database base on the suggestion id attached to the comment
  const suggestion = await Suggestion.findById(req.params.id)
  if(!suggestion) return res.status(404).send('Suggestion id not found')

  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let comment = new Comment({
    title: req.body.title,
    description: req.body.description
  })

  comment = await comment.save()
  res.send(comment)
}

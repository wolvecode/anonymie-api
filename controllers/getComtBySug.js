const axios = require('axios')
const { Suggestion } = require('../model/suggestion')
//Get all comment on a particular Suggestion id
//Post comment on a particular suggestion id
//Get a particular comment on a suggestion id
// keep stared comment(i.e Imoport comment(for decision making))

// exports.getAllComment = async (req, res) => {
//   const comment = await Comment.find()
//   res.send(comment)
// }

exports.getCommentBySugID = async (req, res) => {
  const suggestion = await Suggestion.findById(req.params.id)
  res.send(suggestion._id)
  //   if (suggestion) {
  //     try {
  //       await axios
  //         .get('http://localhost:5000/comment/' + suggestion._id)
  //         .then(response => res.json(response))
  //     } catch (exp) {
  //       res.send(exp.message)
  //     }
  //   } else {
  //     return res.status(404).send('Invalid ID')
  //   }
}

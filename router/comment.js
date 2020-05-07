const express = require('express')
const router = express.Router()

const {
  getAllComment,
  createComment,
  updateComment,
  getCommentByID,
  staredComment
} = require('../controllers/commentController')

router.get('/:id', getCommentByID)

router.get('/', getAllComment)

router.post('/', createComment)

router.put('/:id', updateComment)

router.put('/stared/:id', staredComment)

module.exports = router

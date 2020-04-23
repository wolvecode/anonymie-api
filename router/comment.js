const express = require('express')
const router = express.Router()

const {
  getAllComment,
  createComment,
  updateComment,
  getCommentByID
} = require('../controllers/commentController')

router.get('/:id', getCommentByID)

router.get('/', getAllComment)

router.post('/', createComment)

router.put('/:id', updateComment)

module.exports = router

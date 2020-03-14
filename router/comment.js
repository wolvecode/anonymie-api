const express = require('express')
const router = express.Router()

const {
  getAllComment,
  createComment,
  updateComment
} = require('../controllers/commentController')

router.get('/', getAllComment)

router.post('/', createComment)

router.put('/:id', updateComment)

module.exports = router

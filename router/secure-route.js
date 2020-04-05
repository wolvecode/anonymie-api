const express = require('express')
const router = express.Router()
const { getAllAdmin, addAdmin } = require('../controllers/adminController')
const {
  getAllComment,
  createComment
} = require('../controllers/commentController')

// Get all Admin from the database
router.get('/', getAllAdmin)

router.get('/profile', (req, res, next) => {
  res.json({
    message: 'You made it to the secure route',
    admin: req.admin,
    token: req.query.secret_token
  })
})

router.get('/comment', getAllComment)

router.post('/comment', createComment)

module.exports = router

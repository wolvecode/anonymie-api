const express = require('express')
const router = express.Router()
const { getAllAdmin, addAdmin } = require('../controllers/adminController')

// Get all Admin from the database
router.get('/', getAllAdmin)

router.get('/profile', (req, res, next) => {
  res.json({
    message: 'You made it to the secure route',
    admin: req.admin,
    token: req.query.secret_token
  })
})

module.exports = router

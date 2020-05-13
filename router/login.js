const express = require('express')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const router = express.Router()

//handle signup middleware from middleware-auth
router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    res.json({
      message: 'Signup successful',
      admin: req.admin
    })
  }
)

//Handle login middleware from middleware-auth
router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, admin, info) => {
    try {
      if (err || !admin) {
        const error = new Error('Invalid email or password')
        return next(error.message)
      }
      req.login(admin, { session: false }, async error => {
        if (error) return next(error)
        const body = { _id: admin._id, email: admin.email }
        const token = jwt.sign({ admin: body }, 'top_secret')
        return res.json({ token })
      })
    } catch (error) {
      return next(error)
    }
  })(req, res, next)
})

module.exports = router

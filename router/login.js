const express = require('express')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const router = express.Router()

//signup
router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    res.json({
      message: 'signup successful',
      admin: req.admin
    })
  }
)

//login
router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, admin, info) => {
    try {
      if (err || !admin) {
        const error = new Error('An Error occurred')
        return next(error)
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

// const express = require('express')
// const passport = require('passport')
// LocalStrategy = require('passport-local').Strategy

// passport.use(
//   new LocalStrategy(function(username, password, done) {
//     User.findOne({ username: username }, function(err, user) {
//       if (err) {
//         return done(err)
//       }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' })
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' })
//       }
//       return done(null, user)
//     })
//   })
// )

// const app = express()

// app.post(
//   '/',
//   passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
//   })
// )

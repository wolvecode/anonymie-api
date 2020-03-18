const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const app = express()
const suggestion = require('./router/suggestion')
const comment = require('./router/comment')
const admin = require('./router/admin')
const login = require('./router/login')
const secureRoute = require('./router/secure-route')
const connect = require('./connect')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: true }))

require('./middleware/auth')
app.use('/', login)
//Access to specific route on authorise
app.use('/admin', passport.authenticate('jwt', { session: false }), secureRoute)

app.use(
  '/suggestion',
  passport.authenticate('jwt', { session: false }),
  suggestion
)

//Handles Error
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.json({ error: err })
})

app.use('/comment', comment)
app.use('/admin', admin)

module.exports = app

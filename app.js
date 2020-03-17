const express = require('express')
const bodyParser = require('body-parser')
const config = require('config')
const path = require('path')
const passport = require('passport')
const session = require('express-session')
const mongoose = require('mongoose')
const app = express()
const Joi = require('joi') // remove it, not being used.
const suggestion = require('./router/suggestion')
const comment = require('./router/comment')
const admin = require('./router/admin')
const login = require('./router/login')
const secureRoute = require('./router/secure-route')
// const auth = require('./router/auth')
const connect = require('./connect')

// if (!config.get('jwtPrivateKey')) {
//   console.error('FATAL ERROR: jwtPrivateKey is not defined.')
//   process.exit(1)
// }

// app.use(
//   session({
//     secret: '_anoymie',
//     saveUnInitialized: true,
//     resave: true
//   })
// )

// app.use(passport.initialize())
// app.use(passport.session())
// app.use(express.json())
require('./middleware/auth')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: true }))

app.use('/', login)
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute)

app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.json({ error: err })
})

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
  res.render('adminReg')
})

app.use('/suggestion', suggestion)
app.use('/comment', comment)
app.use('/admin', admin)
// app.use('/auth', auth)

module.exports = app

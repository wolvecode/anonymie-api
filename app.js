const express = require('express')
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
const auth = require('./router/auth')
const connect = require('./connect')

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.')
  process.exit(1)
}

app.use(
  session({
    secret: '_anoymie',
    saveUnInitialized: true,
    resave: true
  })
)

app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
  res.render('adminReg')
})

app.use('/suggestion', suggestion)
app.use('/comment', comment)
app.use('/admin', admin)
app.use('/auth', auth)

module.exports = app

const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const app = express()
const suggestion = require('./router/suggestion')
const comment = require('./router/comment')
const getComtBySugId = require('./router/getComtBySug')

const admin = require('./router/admin')
const login = require('./router/login')
const secureRoute = require('./router/secure-route')
// const getSugComment = require('./router/getSugComment')

require('./connect')
//Set view engine
app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

require('./middleware/auth')
app.use('/', login)
//Access to specific route on authorise
app.use('/admin', passport.authenticate('jwt', { session: false }), secureRoute)
app.get('/', (req, res) => {
  res.render('dashboard')
})
// app.use(
//   '/suggestion',
//   passport.authenticate('jwt', { session: false }),
//   suggestion
// )
//TESTING
app.use('/suggestion', suggestion)

//Handles Error
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.json({ error: err })
})

app.use('/comment', comment)

app.use('/commentbysugid', getComtBySugId)

app.use('/admin', admin)

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})

const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const suggestion = require('./router/suggestion')
const comment = require('./router/comment')
const getComtBySugId = require('./router/getComtBySug')
const admin = require('./router/admin')
const login = require('./router/login')
const secureRoute = require('./router/secure-route')

// Load configurations stored on .env to node env.
require('dotenv').config({ path: path.join(__dirname, '.env') })
//connect to the database
const dbConnect = require('./connect')
dbConnect(process.env.MONGODB_URI || process.env.mongoURI)

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

require('./middleware/auth')
app.use('/', login)

//ACCESS TO SPECIFIC ROUTE ON AUTHOURISE
// app.use('/admin', passport.authenticate('jwt', { session: false }), secureRoute)
// app.use(
//   '/suggestion',
//   passport.authenticate('jwt', { session: false }),
//   suggestion
// )

//TESTING
app.get('/', (req, res) => {
  res.send('Hello world')
})
app.use('/suggestion', suggestion)

app.use('/comment', comment)

app.use('/commentbysugid', getComtBySugId)

app.use('/admin', admin)
//Handles Error
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.json({ error: err })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})

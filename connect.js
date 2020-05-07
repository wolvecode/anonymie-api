const mongoose = require('mongoose')

const connect = mongodbURL => {
  return mongoose
    .connect(mongodbURL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      socketTimeoutMS: 0,
      connectTimeoutMS: 0
    })
    .then(() => console.log('connected to database'))
    .catch(err => console.err('inavlid connection', err))
}

module.exports = connect

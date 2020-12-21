const mongoose = require('mongoose')

const connect = async mongodbURL => {
  return mongoose
    .connect(process.env.mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      socketTimeoutMS: 0,
      connectTimeoutMS: 0
    })
    .then(() => console.log('connected to database'))
    .catch(error => console.error('inavlid connection', error))
}

module.exports = connect

const mongoose = require('mongoose')

//connection to the mongo database
mongoose
  .connect('mongodb://localhost/anoymie', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('connected to database'))
  .catch(err => console.err('inavlid connection'))

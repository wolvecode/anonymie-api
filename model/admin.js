const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Joi = require('joi')
const Schema = mongoose.Schema

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  }
})

adminSchema.pre('save', async function(next) {  
  const admin = this
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash
  next()
})

adminSchema.methods.isValidPassword = async function(password) {
  const admin = this
  const compare = await bcrypt.compare(password, admin.password)
  return compare
}

const Admin = mongoose.model('Admin', adminSchema)

function validateAdmin(admin) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required(),
    password: Joi.string()
      .min(5)
      .max(1024)
      .required()
  }
  return Joi.validate(admin, schema)
}

module.exports.Admin = Admin
module.exports.validate = validateAdmin

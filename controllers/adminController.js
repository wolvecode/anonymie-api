/*
Admin controller will be re-contructed, admin will only be availabke on authorise..
No access to admin without been authorised
 */

const _ = require('lodash')
const bcrypt = require('bcrypt')
const { Admin, validate } = require('../model/admin')

exports.getAllAdmin = async (req, res) => {
  const admin = await Admin.find()
  res.send(admin)
}

exports.addAdmin = async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let admin = await Admin.findOne({ email: req.body.email })
  if (admin) return res.status(400).send('Admin is already resgistered')

  admin = new Admin(_.pick(req.body, ['name', 'email', 'password']))

  const salt = await bcrypt.genSalt(10)
  admin.password = await bcrypt.hash(admin.password, salt)

  admin = await admin.save()

  const token = admin.generateAuthToken()
  res
    .header('x-auth-token', token)
    .send(_.pick(admin, ['_id', 'name', 'email']))
}

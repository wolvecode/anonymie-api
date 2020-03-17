const express = require('express')
const LocalStrategy = require('passport-local').Strategy
const auth = require('../middleware/auth')
const _ = require('lodash')
const router = express.Router()
const { Admin, validate } = require('../model/admin')
const { getAllAdmin, addAdmin } = require('../controllers/adminController')

// router.get('/me', auth, async (req, res) => {
//   const admin = await Admin.findById(req.admin._id).select('-password')
//   console.log(admin)
//   res.send(admin)
// })

router.get('/', getAllAdmin)

router.post('/', addAdmin)

module.exports = router

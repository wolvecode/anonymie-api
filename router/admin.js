//Will be remove, has been replaced by secure-router
const express = require('express')
const router = express.Router()
const { getAllAdmin, addAdmin } = require('../controllers/adminController')

router.get('/', getAllAdmin)

router.post('/', addAdmin)

module.exports = router

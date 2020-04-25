const express = require('express')
const router = express.Router()
const { getComtBySugId } = require('../controllers/getComtBySug')

router.get('/suggestion/:id', getComtBySugId)

module.exports = router

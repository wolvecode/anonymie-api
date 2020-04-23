const express = require('express')
const router = express.Router()

const { getCommentBySugID } = require('../controllers/getComtBySug')

router.get('/suggestion/:id', getCommentBySugID)

module.exports = router

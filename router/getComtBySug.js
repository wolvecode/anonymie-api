const express = require('express')
const router = express.Router()
const {
  getComtBySugId,
  createComBySugID,
  staredComment
} = require('../controllers/getComtBySug')

router.get('/:id', getComtBySugId)

router.post('/', createComBySugID)

router.put('/', staredComment)

module.exports = router

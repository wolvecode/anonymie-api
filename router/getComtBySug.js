const express = require('express')
const router = express.Router()
const {
  getComtBySugId,
  createComBySugID
} = require('../controllers/getComtBySug')

router.get('/:id', getComtBySugId)

router.post('/', createComBySugID)

module.exports = router

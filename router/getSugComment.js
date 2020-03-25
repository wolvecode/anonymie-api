const express = require('express')
const {
  getComtSugId,
  createCommentBySugId
} = require('../controllers/getSugComtController')
const router = express.Router()

//Get all commenrt under a specific suggestion id
router.get('/:id', getComtSugId)
//Post a comment under a specific suggestion id
router.post('/', createCommentBySugId)

const express = require('express')
const router = express.Router()
const { Suggestion, validate } = require('../model/suggestion')

const {
  getAllSuggestion,
  getSuggestionById,
  createSuggestion,
  updateSuggestionById,
  deleteSuggestion
} = require('../controllers/suggesionController')

router.post('/', getAllSuggestion)

router.get('/:id', getSuggestionById)

router.post('/', createSuggestion)

router.put('/:id', updateSuggestionById)

router.delete('/:id', deleteSuggestion)

module.exports = router

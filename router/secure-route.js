const express = require('express')
const router = express.Router()
const { getAllAdmin, addAdmin } = require('../controllers/adminController')

// const {
//   getAllSuggestion,
//   getSuggestionById,
//   createSuggestion,
//   updateSuggestionById,
//   deleteSuggestion
// } = require('../controllers/suggestionController')

//admin suggestion goes on authurize
/**
 * 
 Admin will be able to add suggestion,
  delete suggestion from user view and
   will have access to available resource by user
 */

//Get all Admin from the database
router.get('/', getAllAdmin)

// router.get('/profile', (req, res, next) => {
//   res.json({
//     message: 'You made it to the secure route',
//     admin: req.admin,
//     token: req.query.secret_token
//   })
// })

module.exports = router

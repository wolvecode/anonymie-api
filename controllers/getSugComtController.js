const { Suggestion, validate} = require('../model/suggestion')
const Comment = require('../model/comment')
const _ = require('lodash')
const bcrypt = require('bcrypt')

exports.getComtBySugId = async (req, res, next) => {
    //get a suggestion id
    //get a comment by the suggestion id
    try {
        const suggestion = await Suggestion.findById(req.params.id)
        if(!suggestion){
            return res.status(404).send('The suggestion with given Id was not found')
        }
        try{

        }
      } catch (err) {
        console.log(err.message)
      }
}


exports.createCommentBySugId = (req, res, next) =>{
    //get a suggestion id
    //create a comment base on the id
    //save to the database base on the suggestion id attached to the comment

}
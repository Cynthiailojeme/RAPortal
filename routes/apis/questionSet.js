const express = require('express');
const router = express.Router();
const QuestionSet = require('../../models/QuestionSet');
const TokenMiddleware = require('../../middleware/token');
const ApplicantAns = require('../../models/ApplicantAns');

// Create a Questionset
router.post('/add', (req, res, next) => {
    console.log(req.body)
      const nameOfSet = req.body.nameOfSet;
      const quiz = req.body.quiz;
      const duration = req.body.duration;
      const dateOfAsess = req.body.dateOfAsess;
      
  
      newQuestionSet = new QuestionSet({
          nameOfSet: nameOfSet,
          quiz: quiz,
          duration: duration,
          dateOfAsess: dateOfAsess,
          timestamps: true,
          
      });
      newQuestionSet.save()
      .then(questionset => {
          res.status(200).json({
            message: "Uploaded successfully",
            questionset
          }); 
      })
      .catch(err => console.log(err));
  });

  // Get one questionset
router.get('/single/:id', TokenMiddleware, (req, res, next) => {
  const {userId} = req.decoded;
  console.log( "user id " + userId)
  //Grab the id of the questionset
  let id = req.params.id;
  ApplicantAns.find({userId})
      .then((response) => {
        QuestionSet.findById(id)
        .then((questionset) => {
          console.log(questionset)
            res.json(questionset);
        })
        .catch(err => console.log(err))
        console.log(response)
          // res.json(questionset);
      })
      .catch(err => console.log(err))
});

// Get all the questionsets
router.get('/all', (req, res, next) => {
  QuestionSet.find()
      .then((questionsets) => {
          res.json(questionsets);
      })
      .catch(err => console.log(err))
});

// make delete a questionset
router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  QuestionSet.findById(id)
  .then(questionset => {
      questionset.delete()
      .then(question =>{
          res.send({message: 'Question deleted succesfully',
          status: 'success',
          questionset: questionset})

      })
      .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
})

module.exports = router;

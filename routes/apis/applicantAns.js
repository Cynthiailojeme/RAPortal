const express = require('express');
const router = express.Router();
const ApplicantAns = require('../../models/ApplicantAns');
const QuestionSet = require('../../models/QuestionSet');
const TokenMiddleware = require('../../middleware/token');
const mongoose = require('mongoose');

router.post("/send", TokenMiddleware, (req, res, next) => {
      const answers = req.body.answers;
      const setId = req.body.setId;
      const { userId } = req.decoded;
      let score = 0;

  QuestionSet.findById(setId)
      .then((questionset) => {
        // console.log(questionset.quiz)
        for(var j = 0; j < answers.length; j++) {
          for(var k = 0; k < questionset.quiz.length; k++) {
            console.log(answers[j].question_id, questionset.quiz[k]._id)
            if(answers[j].question_id == questionset.quiz[k]._id) {
              console.log(answers[j].ans, questionset.quiz[k].correctAnswer)
              if(answers[j].ans === questionset.quiz[k].correctAnswer){
                score+=1;
              }
              // console.log(questionset.quiz[k])
            }
          }
        }
        newApplicantAns = new ApplicantAns({
          answers: answers,
          setId: setId,
          score: score,
          userId: mongoose.Types.ObjectId(userId),
          timestamps: true
      });
      newApplicantAns.save()
      .then(applicantans => {
          res.status(200).json({
            message: "Uploaded successfully",
            applicantans
          }); 
      })
      .catch(err => console.log(err));
      console.log(score)
          // res.json(questionset);
      })
      .catch(err => console.log(err))
        
      });

// Get all users tests scores
router.get('/all', (req, res, next) => {
  ApplicantAns.find()
      .then((applicantanss) => {
          res.json(applicantanss);
      })
      .catch(err => console.log(err))
});

// make delete a applicantans
router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  ApplicantAns.findById(id)
  .then(applicantans => {
    applicantans.delete()
      .then(applicantans =>{
          res.send({message: 'Question deleted succesfully',
          status: 'success',
          applicantans: applicantans})

      })
      .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
})

module.exports = router;
  
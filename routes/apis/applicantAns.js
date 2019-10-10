const express = require('express');
const router = express.Router();
const ApplicantAns = require('../../models/ApplicantAns');
const QuestionSet = require('../../models/QuestionSet');
const TokenMiddleware = require('../../middleware/token');


router.post("/send", TokenMiddleware, (req, res, next) => {
  const answers = req.body.answers;
  const setId = req.body.setId;
  const { userId } = req.decoded;
  const takenassessment = req.body.takenassessment
  let score = 0;



  QuestionSet.findById(setId)
    .then((questionset) => {
      // console.log(questionset.quiz)
      for (var j = 0; j < answers.length; j++) {
        for (var k = 0; k < questionset.quiz.length; k++) {
          console.log(answers[j].question_id, questionset.quiz[k]._id)
          if (answers[j].question_id == questionset.quiz[k]._id) {
            console.log(answers[j].ans, questionset.quiz[k].correctAnswer)
            if (answers[j].ans === questionset.quiz[k].correctAnswer) {
              score += 1;
            }
            // console.log(questionset.quiz[k])
          }
        }
      }

      newApplicantAns = new ApplicantAns({
        answers: answers,
        setId: setId,
        score: score,
        userId: userId,
        timestamps: true,
        takenassessment,
      });


      ApplicantAns.findById(userId).then((result) => {
        if(result == undefined || result.length == 0){
          res.status(400).json({
            message: "No answer submitted yet"
          });
        }else{
          res.status(400).json({
            message: "User Already submitted assessment"
          });
        }
        }).catch((err) => {
          newApplicantAns.save()
            .then(applicantans => {
              res.status(200).json({
                message: "Uploaded successfully",
                applicantans
              });
            })
            .catch(err => console.log(err));
          console.log(score)
          console.log(err)
        })


    })
    .catch(err => console.log(err))
});

// delete at once all collections in the db
router.delete('/empty', (req, res, next) => {
  ApplicantAns.remove({}, function (err) {
    if (err) {
      console.log(err)
      res.json({ status: "Error Deleting all documents" });
    } else {
      res.json({ status: "Successfully deleted all documents in collection" });
    }
  }
  );
})

// Get all users tests scores
router.get('/all', (req, res, next) => {
  ApplicantAns.find()
    .then((applicantanss) => {
      res.json(applicantanss);
    })
    .catch(err => console.log(err))
});

// make delete a applicant ans
router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  ApplicantAns.findById(id)
    .then(applicantans => {
      applicantans.delete()
        .then(applicantans => {
          res.send({
            message: 'Question deleted succesfully',
            status: 'success',
            applicantans: applicantans
          })

        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

module.exports = router;

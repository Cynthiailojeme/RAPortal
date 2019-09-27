const express = require('express');
const router = express.Router();
const ApplicantAns = require('../../models/ApplicantAns');

// Create a Question
router.put('/add', (req, res, next) => {
    console.log(req.file)
      const quiz = req.body.quiz;
      const options = req.body.options;
      const correctAnswer = req.body.correctAnswer;
  
      newQuestion = new Question({
          img: img,
          quiz: quiz,
          options: options,
          correctAnswer: correctAnswer,
          timestamps: true
      });
      newQuestion.save()
      .then(question => {
          res.status(200).json({
            message: "Uploaded successfully",
            question
          }); 
      })
      .catch(err => console.log(err));
  });

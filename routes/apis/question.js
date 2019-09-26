const express = require('express');
const router = express.Router();
const Question = require('../../models/Question');
const multer = require('multer');
// const upload = multer({dest: 'uploads/'});

var storage = multer.diskStorage({
    destination: 'uploads',
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() +'.jpg')
     
    }

  })
  
const upload = multer({ storage: storage });

// Create a Question
router.post('/add', upload.single('img'), (req, res, next) => {
  console.log(req.file)
    const title = req.body.title;
    const quiz = req.body.quiz;
    const options = req.body.options;
    const correctAnswer = req.body.correctAnswer;

    newQuestion = new Question({
        title: title,
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


// Get a Question set
router.get('/all', (req, res, next) => {
    Question.find()
        .then((questions) => {
            res.json(questions);
        })
        .catch(err => console.log(err))
});

// make delete request
router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  Question.findById(id)
  .then(question => {
      question.delete()
      .then(question =>{
          res.send({message: 'Question deleted succesfully',
          status: 'success',
          question: question})

      })
      .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
})

module.exports = router;
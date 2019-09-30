const mongoose = require('mongoose');

const QuestionSetSchema = mongoose.Schema({
  nameOfSet: {
    type: String,
  },
  quiz: {
    type: [
        {question: {
          type: String,
          required: true
        },
      image: { 
          type: String
        },
      correctAnswer: {
            type: String,
            default: undefined,
            required: true
          },
      options: {
            type: [],
            default: undefined,
            required: true,
            validate: {
              validator: function(value) {
                return value && value.length === 4;
              },
            message: 'Answer options should be 4.'
        },
      }
      },
    ]
    // validate: {
    //   validator: function(value) {
    //     return value.length > 10 <= 30;
    //   },
    //   message: 'Question must contain be 10 to 30 questions.'
    // }
  },
  duration: {
      type: Number
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('QuestionSetSchema', QuestionSetSchema);
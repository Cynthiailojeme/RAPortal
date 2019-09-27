const mongoose = require('mongoose');
const {Types: {ObjectId}} = mongoose;
const validateObjectId = (id) => ObjectId.isValid(id) && (new ObjectId(id)).toString() === id;

const QuestionSchema = mongoose.Schema({
    quiz: {
        type: String,
        minlength: 10,
        maxlength: 1000,
        required: true
      },
    img: { 
        type: String, 
        required: true
      },
    correctAnswer: {
          type: String,
          default: undefined
        },
    options: {
          type: [],
          default: undefined,
          validate: {
            validator: function(value) {
              return value && value.length === 4;
            },
      message: 'Answer options should be 4.'
    },}
    },
      {
      timestamps: true
      });

    
module.exports = mongoose.model('Question', QuestionSchema);

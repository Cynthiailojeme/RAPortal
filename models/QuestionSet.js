import { QuestionSchema } from "./Questions";
const mongoose = require('mongoose');

const QuestionSetSchema = mongoose.Schema({
  questionSet: {
    type: [QuestionSchema],
    validate: {
      validator: function(value: any) {
        return value.length === 5;
      },
      message: 'Question set must be 5.'
    }
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('QuestionSetSchema', QuestionSetSchema);
const QuestionSet = newModel({QuestonSetSchema})
newDocument.save()

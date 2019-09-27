import { QuestionSchema } from "./Question";
const mongoose = require('mongoose');

const QuestionSetSchema = mongoose.Schema({
  questionSet: {
    type: [QuestionSchema],
    validate: {
      validator: function(value: []) {
        return value.length === 5;
      },
      message: 'Question set must be 5.'
    }
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('QuestionSetSchema', QuestionSetSchema);
newDocument.save()
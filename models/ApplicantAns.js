const mongoose = require('mongoose');
const {Types: {ObjectId}} = mongoose;
const validateObjectId = (id) => ObjectId.isValid(id) && (new ObjectId(id)).toString() === id;

const ApplicantAnsSchema = new Schema({
    applicant: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    questionAnswers: {
      type: [String] // You can add answer schema
    },
    totalScore: {
      type: Number
    },
    isPassed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  });
  
  ApplicantAnsSchema.pre('save', function updateTotalScore(next) {
    // update total score of the candidate here based on the correct questionAnswers and
    // questionSet.
    next();
  });
  
  ApplicantAnsSchema.pre('save', function updateIsPassed(next) {
    // update the isPassed based on the totalScore obtained by the candidate.
    next();
  });
  
module.exports = mongoose.model('ApplicantAns', ApplicantAnsSchema);
  
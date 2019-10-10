const mongoose = require('mongoose'); mongoose.set('useCreateIndex', true);

const RecruitSchema = mongoose.Schema({
	first_name:{
        type: String,
        required: true
    },

    last_name:{
        type: String,
        required: true
    },

    	email:{
        type: String,
        required: true
    },

    date_of_birth:{
       type: String,
        required: true
    },

    address:{
        type: String,
        required: true
    },

    university:{
        type: String,
        required: true
    },

    course_of_study:{
        type: String,
        required: true
    },

    cgpa:{
        type: Number,
        required: true
    },

     created_at:{
        type: Date,
        default: Date.now
    }


});

const Recruit = module.exports = mongoose.model('Recruit', RecruitSchema);

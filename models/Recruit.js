const mongoose = require('mongoose');

const RecruitSchema = mongoose.Schema({
	first_name:{
        type: String,
        required: true
    },

    last_name:{
        type: String,
        required: true
    },

    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],



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

RecruitSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

const Recruit = module.exports = mongoose.model('Recruit', RecruitSchema);

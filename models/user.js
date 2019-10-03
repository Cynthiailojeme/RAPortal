const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    first_name:{
        type: String,
        required: false, 
    },
    last_name:{
        type: String,
        required: false,
    },
    email:{
        type: String,
        required: true
        // unique: true,
        // match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    phone_number:{
        type: String,
        required: false,
    }, 
    password:{
        type: String,
        required: true
    }, 
    confirm_password:{
        type: String,
        required: false,
    },
    created_at: {
        type: Date,
        default: Date.now
    }
    });
        
const user = module.exports = mongoose.model('user', userSchema);
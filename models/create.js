const mongoose = require('mongoose'); mongoose.set('useCreateIndex', true);

const createSchema = mongoose.Schema({

    // file:{
    //     type: String,
    //     required: false,  
    // },

    file:{ data: Buffer, contentType: String },

    link:{
        type: String,
        required: false,

    },

    application_date:{
        type: String,
        required: false,
     
    },

    batch_id:{
        type: String,
        required: false,
    },

    instruction:{
        type: String,
        required: false
    },

    created_at: {
        type: Date,
        default: Date.now
    }
});

const create = module.exports = mongoose.model('create', createSchema);







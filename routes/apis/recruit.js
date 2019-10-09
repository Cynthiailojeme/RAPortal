const express = require('express');
const router = express.Router();
const Recruit = require('../../models/Recruit');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config();


router.get('/', (req, res, next) => {
    Recruit.find()
    .then((posts) => {
        res.json(posts);
    }) 
    .catch(err => console.log(err))

});


 router.get('/single/:id', (req, res, next) => {
        //Grab the id of each applicant
        let id = req.params.id;
        Recruit.findById(id)
            .then((recruit) => {
                res.json(recruit);
            
            })
            .catch(err => console.log(err))
    });




    router.post('/signup', (req, res, next) => {
        const output = `<p>Your Application has been recieved</p>`
        let transport = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "gabrielhephzibah24@gmail.com", //generated by Mailtrap
            pass: "titi2470" //generated by Mailtrap
          },
          tls:{
            rejectUnauthorized:false
          }
        });

        let mailOptions = {
            from: '"Enyata Software Engineering Company " <gabrielhephzibah24@gmail.com>',
            to: req.body.email,
            subject: 'Enyata Academy ',
            text: 'Hey there, it’s our first message sent with Nodemailer ;) ', 
            html: output
        };

        transport.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
        });

    let error = [];
    if (req.body.password != req.body.confirm_password){
    return res.status(400).json({
    message:"Password do not match"
    });
    if(req.body.password < 4){
        return res.status(401).json({
            message:"password must be at least 4 characters"
    });
    }

    // else {
    //     res.status(201).json({
    //     message: ' signup successfully',
    // });
    // }
}
Recruit.find({email: req.body.email})
    .exec()
    .then(recruit => {
        if (recruit.length >= 1) {
            return res.status(409).json({
            message:'Mail already exist'
    });
    } else{
        bcrypt.hash(req.body.password, 10, (err, hash) =>{
        if (err) {
            return res.status(500).json({
            error: err
        });
    } else{
    const recruit = new Recruit({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    password: hash,
    first_name:req.body.first_name,
    last_name:req.body.last_name,
    date_of_birth:req.body.date_of_birth,
    address:req.body.address,
    university: req.body.university,
    course_of_study: req.body.course_of_study,
    cgpa:req.body.cgpa
});
    recruit
    .save()
    .then(result => {
    console.log(result);
    res.status(201).json({
message: ' signup successfull',
applicant:recruit

});

})
.catch(err =>{
console.log(err);
res.status(500).json({
error: err
});
});
}
});
}
})





       //  const first_name = req.body.first_name;
       //  const last_name = req.body.last_name;
       //  const email = req.body.email;
       //  const date_of_birth = req.body.date_of_birth;
       //  const address = req.body.address;
       //  const university = req.body.university;
       //  const course_of_study = req.body.course_of_study;
       //  const cgpa = req.body.cgpa;

       //  newRecruit = new Recruit({
       //      first_name: first_name,
       //     last_name: last_name,
       //     email: email,
       //      date_of_birth: date_of_birth,
       //      address: address,
       //      university: university,
       //      course_of_study : course_of_study,
       //      cgpa : cgpa
           

       //  });
       // newRecruit.save()
       //  .then(recruit => {
       //      res.json(recruit)
       //  })
       //  .catch(err => console.log(err));
        
    });


router.post("/login", (req, res, next) => {

    Recruit.find({email: req.body.email})
        .exec()
        .then(user => {
         console.log("USER ==> ", user)
    //     if (recruit.length < 1 ){
    //          return res.status(403).json({
    //         message: 'Authentication Failed, please enter correct email and password'
    //     });
    // }
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
    if (err){
        return res.status(403).json({
        message: 'Authentication Failed, please enter correct email and password'
    });
}
    if (result) {
    const token = jwt.sign(
    {
    email: user[0].email,
    userId: user[0]._id
    }, 
    process.env.JWT_KEY, 
    {
    // expiresIn: "1h"
    }
);

    return res.status(200).json({
        message: 'Login successfull',
        token: token,
        user: user[0]
        
    });
}
    res.status(401).json({
        message: 'Verification failed, pls enter correct email and password'
    });
    });
    })
    .catch(err =>{
    console.log(err);
    res.status(500).json({
    error: err
    });
});


});




router.delete('/:userId', (req, res, next) =>{
    Recruit.remove({_id: req.params.userId})
    .exec()
    .then(result =>{
        res.status(200).json({
        message: 'User deleted'
    })
})
    .catch(err =>{
    console.log(err);
    res.status(500).json({
    error: err
    });
});
});

module.exports = router;

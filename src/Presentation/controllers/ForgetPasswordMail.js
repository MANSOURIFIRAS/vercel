const User = require('../../Infrastructure/Models/userModel');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { nextTick } = require('process');

// Create a nodemailer   
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'habibfiras.hadroug@esprit.tn',
      pass: 'habib9999*'
    }
  });
  //
  //
  // Generate a random verification code
  const codeRecuperation = crypto.randomBytes(3).toString('hex'); // 3 bytes will generate a 6-digit hex code
   
  // Define the email content
  
  
  // Send the email
  const sendps = async (req, res) => {
try{
  const mailOptions = {
    from: 'habibfiras.hadroug@esprit.tn',
    to: req.body.email,
    subject: 'Password reset verification code',
    text: `Your password reset verification code is: ${codeRecuperation}`
  };
  console.log(req.body.email)
  const send = transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      const update ={codeRecuperation:codeRecuperation}
      const user=User.findOneAndUpdate({email:req.body.email},update,{new : true}
        
        
        )
        .then(resp => {
          if (!resp) {
           // console.log(err);
            res.send("err");
          } else {
            res.send("ok");
          }
        }
        )


    }
  });
}catch(err){
  console.log(err)


}
};



const verifps= async (req, res,next) => {
  const user = await User.findOne({email:req.body.email}).then((user,err) => {
    if (err) {
      console.log(err);
    } else {
       if(user.codeRecuperation==req.body.codeRecuperation){
        res.send("ok");
        user.codeRecuperation = "1";
    user.save();
    // Set the user object on the request object for later use
    req.user = user;


  }else{
    res.send("err");
  }
    }

 

});
}

const changeps= async (req, res) => {
  try{
    const user = await User.findOne({email:req.body.email}).then((user,err) => {
      if(user){
        if(user.codeRecuperation === "1"){
          user.password=req.body.password;
          user.codeRecuperation = "";
          user.save()
          res.send('changed')

        }
        else{
          res.send('code incorrect')
        }
      }
      else{
        res.send('user not found');
      }
     
  
      
    });
  }
  catch(err){
    console.log("err");
  }
 



}






  module.exports = {
    sendps,verifps,changeps
  
  };
  
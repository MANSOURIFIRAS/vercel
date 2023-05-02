const crypto=require('crypto');
const  jwt = require('jsonwebtoken');

module.exports.getCurrentDate = () => {
    
    const currentdate = new Date();

    const currentTime = currentdate.getDate() + "-"
                        + (currentdate.getMonth()+1)  + "-" 
                        + currentdate.getFullYear() + " "  
                        + currentdate.getHours() + ":"  
                        + currentdate.getMinutes() + ":" 
                        + currentdate.getSeconds();

    return currentTime;
};

module.exports.getActivationCode = () => {
        
    return crypto.randomBytes(5).toString('hex');

};

module.exports.getActivationCodeExpDate = () => {

    var today = new Date();
    var expiry_date = new Date();
    expiry_date.setDate(today.getDate() + Number.parseInt(2));

    return expiry_date;
    
};

module.exports.generateActivationtoken= (email,activationCode)=>{
    const payload = {email,activationCode};
    const secret = 'bioup';
    const options = { expiresIn: '2d' };
    const token =jwt.sign(payload,secret,options);
    return token;
}
/*
module.exports.decryptActicateToken=(token)=>{

    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
       return false;
      } else {
        console.log(decoded);
    
        if (decoded.activationCode === expected) {
          return true;
        } else {
          return false;
        }
      }}
      );
      const secret = 'my_secret_key';

     return jwt.verify(token,secret);

}*/
module.exports.decryptActivateToken=(token)=>{
  const secret = 'bioup';

  try {
    const decoded = jwt.verify(token,secret);
    return decoded;
  } catch (error) {
    console.error(error);
    return false;
  }
}




const jwt = require('jsonwebtoken');

const User = require('../../Infrastructure/Models/userModel');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    // console.log("1 "+token);
    if (token.startsWith('"')) {
     var result= token.substring(1, token.length-1);

    }else{
      var result=token;
    }
// console.log("2 "+token);
    var decoded = jwt.verify(result, process.env.PRIVATEKEY);
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': result,
    });
    if (!user) {
      throw new Error();
    }
    req.token = result;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ errorMessage: 'Please authenticate.' });
  }
};

module.exports = auth;

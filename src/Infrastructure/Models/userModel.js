const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: `${__dirname}/../Database/.env` });

const userSchema = new mongoose.Schema({

  firstName: { type: String, default:''},
  lastName: { type: String, default:''},
  email: { type: String ,default:''},
  password: { type: String, default: '' },
  phone:{ type: String,default:''},
  role: { type: String, default: 'user' },
  createdAt: { type: Date, default: Date.now },
  lastLoginAt: { type: Date ,default:''},
  activationCode:{type :String,default:''},
  //codeExpireDate:{type:String},
  statusActivation:{type:Boolean,default:false},
  codeRecuperation: {type:String, default:''},
  isBlocked: { type: Boolean, default: false },
  adress:{type:String},
  uid: {type: String},
  gender: {type : String} ,
  pic:{type : String} ,
  token:{type : String} ,
  position: {
    lat: { type: Number, default: 0 },
    lng: { type: Number, default: 0 }
  },


  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],

});

userSchema.methods.generateAuthToken = async function generateAuthToken() {
  const user = this;
  const token = jwt.sign(
    {
      _id: user._id.toString(),
      email: user.email||"",
      phone: user.phone||"",
      firstName: user.firstName||"",
      role: user.role,
    },
    process.env.PRIVATEKEY
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};


userSchema.statics.findByCredentials = async function findByCredentials(
  phone,
  email,
  password
) {
  var user;
  if(phone!=="" && email!==""){
    user = await userModel.findOne({ email, phone });
  }else if(phone!==""){
    user = await userModel.findOne({ phone });
  }else if(email!==""){
    user = await userModel.findOne({ email });
  }
  
  if (!user) {
    const error = new Error(
      'USER_NOT_FOUND'
    );
    error.code = 404;
    throw error;
  }
  if(!user.statusActivation){
    const error = new Error(
      'NOT_ACTIVATED'
    );
    error.code = 401;
    throw error;
  }
  if(user.isBlocked){
    const error = new Error(
      'BLOCKED'
    );
    error.code = 401;
    throw error;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error(
      'INCORRECT_PASSWORD'
    );
    error.code = 401;
    throw error;
  }
  return user;
};
userSchema.statics.findByCredentialsfb = async function findByCredentialsfb(
  email
) {
  const user = await userModel.findOne({ email });
  if (!user) {
    const error = new Error(
      'Impossible de se connecter , utilisateur non enregistré'
    );
    error.code = 404;
    throw error;
  }
  
  return user;
};

// Hash the plain text password before saving
userSchema.pre('save', function preSave(next) {
  try {
    const user = this;
    console.log("user before hash",user);
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(8, (err, salt) => {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, (bcryptError, hash) => {
        if (bcryptError) return next(bcryptError);

        // override the cleartext password with the hashed one
        user.password = hash;
        return next();
      });
    });
  } catch (e) {
    throw e;
  }
});
const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
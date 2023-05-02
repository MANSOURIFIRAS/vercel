const userService = require('../../Application/UseCases/user/userService');
const User = require('../../Infrastructure/Models/userModel');
const utils=require('../../Presentation/utils/verifaccountutils');
const getSmsToken=require('../../Presentation/middlwares/getSmsToken');
const userServ =require('../../Application/UseCases/user/userService');

const omit = require('../utils/omit');
const uploadImage = require('../utils/cloudinary/uploadImage');
const fs = require('fs');
const path = require('path');



const existPhone=async(req,res) =>{
  try {
    const exist = await userService.isUserExistByPhone(req.params.phone);
    return res.status(200).send(exist)
  } catch (error) {
    console.log(error)
  }
}

const existEmail=async(req,res) =>{
  try {
    const exist = await userService.isUserExistByEmail(req.params.email);
    return res.status(200).send(exist);
  } catch (error) {
    console.log(error)
  }
}

const login = async (req, res) => {
  try {
    const user = req.body;
    const token = await userService.userLogin(user);
    res
      .header('x-auth-token', token)
      .header('access-control-expose-headers', 'x-auth-token')
      .status(200)
      .send({ token });
  } catch (e) {
    res.status(e.code || 400).send({ error: e.message });
  }
};

const logout = async (req, res) => {
  try {
    tokens= req.user.tokens;
    token = req.token;
     const filteredTokens =await userService.userLogout(tokens, token);
     req.user.tokens=filteredTokens;
    await req.user.save();
    res.status(200).send();
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
}

 const sendActivateCodeMail = async (req, res) => {
  try{
    console.log(req.params.mail);
      const user =await userServ.activationMail(req.params.mail);
      console.log(user);
   res.status(200).send(user);
}
catch(e){
 res.status(500).send('error updating activation code '+e);
}
}

const verifyAccountMail =  async (req, res) => {
  try{
    const user =await userServ.verifyActivationCodeMail(req.params.token); 
    console.log(user);
    res.send(user);

    //
  }catch(e){
    res.send('unverified');
  }
 
}

const sendActivateCodeSmS= async (req, res) => {
  try{
    console.log(req.params.phone);
    const user =await userServ.sendActivationCodeBySms(req.params.phone);
    console.log(user);
    res.status(200).send(user);
  }
  catch(e){ 
    res.status(500).send('error updating activation code '+e);
  }
}


const verifyAccountSms = async (req, res) => {
  try{
    const smscode = req.params.smscode;
    const user = await User.findOne({activationCode:smscode}); 
      user.statusActivation = true;
      await user.save();
      console.log(user);
      res.send('activation avec succées');
  }catch(e){
    res.send('code invalid');
  }
  
}
const sendCodeRecBySms =async (req,res)=>{
  try{
    const user = await userServ.sendCodeRecPassSms(req.params.phone);
    console.log(user);
    res.send('sent')
  }catch(e){
    res.send('error');
  }
}

const verifyCodeRecBySms = async (req, res) => {
 console.log(req.query)
  try {
    const user = await userServ.verifyCodeRecPassSms(req.query.phone, req.query.code);
    console.log(user);
    res.send('succes');
  } catch (e) {
    console.log(e)
   res.send('error');
  }
};

const changePass =async (req,res)=>{
  const {phone,password}=req.body;
  try {
    const user = await userServ.changedPass(phone,password);
    res.send('succes');
  } catch (e) {
    res.send('error');
  }
}

 

const addUser = async (req, res) => {
  try {
    if(req.body.email!==""){
      const userIsExist = (await User.exists({ email: req.body.email })) || null;
      if (userIsExist) {
        console.log("Email Alerady Exists ")
        return res.status(409).send({ error: 'User Email is already registered'  , field: 'email'});
      }
    }
    if(req.body.phone!==""){
    const userIsExist = (await User.exists({ phone: req.body.phone })) || null;
    if (userIsExist) {
      console.log("Phone Alerady Exists ")
      return res.status(409).send({ error: 'User Phone is already registered', field: 'phone'  });
    }
  }

  const userData = omit(req.body, ['file']);
  const user = new User(userData);


  if (Object.keys(req.files || {}).length > 0) {

    const image = req.files.file[0] || req.body.file || { path: '' };
    const uploadedImage = await uploadImage(image.path);

    user.pic = uploadedImage ? uploadedImage.url : '';
    if (uploadedImage) {
      let filePath = path.join(`${__dirname}/../../`, image.path);
      if (filePath.includes('uploads')) {
        fs.unlink(filePath, () => {});
      } 
    }
  }
    await user.save();
    if(user.phone===""){
      await userServ.activationMail(req.body.email);
    }else{
      await userServ.sendActivationCodeBySms(req.body.phone);
    }
  
    const token = await user.generateAuthToken();
    res
      .header('x-auth-token', token)
      .header('access-control-expose-headers', 'x-auth-token')
      .status(201)
      .send({ token });
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
};


const getConnectedUser = async (req, res) => {
  try {
    res
      .status(200)
      .send({id:req.user._id,
         email: req.user.email,
         firstName: req.user.firstName ,
         lastName: req.user.lastName ,
          role: req.user.role ,
          pic: req.user.pic ,
           phone: req.user.phone,
           password:req.user.password,
           createdAt:req.user.createdAt,
           lastLoginAt:req.user.createdAt,
           statusActivation:req.user.statusActivation,
           gender:req.user.gender,
           });
  } catch (e) {
    res.status(500).send();
  }
}




const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params._id);
    return res.status(200).send(user);
  } catch (e) {
    res.status(500).send({ error: e });
  }
}
const verifyIfPhoneExist = async (req, res)=>{
  try{
    console.log(req.params.phone)
    const user = await userServ.verifyIfPhoneExistence(req.params.phone);
    res.status(200).send(user);
  }catch(e){
    res.send("error");
  }
 }

const getUsersList= async(req,res)=>{
try{
  const users = await User.find().select('firstName password email role');
  res.send(users);
}catch(e){
  res.status(500).send({error:e})
}
}

//Desactivate User Account

const DesactivateUserAccount = async (req, res) => {
  const user = await User.findById(req.params._id);
  try {
    user.isBlocked = false;
    await user.save();
    res.status(200).send({ message: 'Action completed successfully!' });
  } catch (e) {
    res.status(400).send(e);
  }
}

const getUserByIdd=async (req,res)=>{

    try {
      const user = await User.findOne({_id:req.params.id});
      return res.status(200).send(user);
    } catch (e) {
      res.status(500).send({ error: e });
    }
  
}


module.exports = {
  login,logout,
  sendActivateCodeMail,verifyAccountMail,sendActivateCodeSmS,verifyAccountSms,getConnectedUser,
sendCodeRecBySms,verifyCodeRecBySms,changePass,getUserById,getUsersList,DesactivateUserAccount,addUser,verifyIfPhoneExist,
existEmail,existPhone,getUserByIdd
};
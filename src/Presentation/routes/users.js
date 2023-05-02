const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlwares/auth');
const User = require('../../Infrastructure/Models/userModel');

router.put('/updateactivationcode/:mail',userController.sendActivateCodeMail);
router.get('/check/activate/account/:token',userController.verifyAccountMail);
router.put('/updateactivationcodesms/:phone',userController.sendActivateCodeSmS);
router.get('/check/activate/accountsms/:smscode',userController.verifyAccountSms);
router.put('/updateCodeRecupPassBySms/:phone',userController.sendCodeRecBySms);
router.get('/check/activate/:codeRecupPassBySms',userController.verifyCodeRecBySms);
router.put('/changepassword/',userController.changePass);
router.get('/existphone/:phone',userController.verifyIfPhoneExist);

//Create New User
router.post('/auth/',userController.addUser);
//Desactivate User Account

router.patch(
  '/desactivate/:_id',
  auth,
  userController.DesactivateUserAccount
);


//Get all users
router.get('/list',auth,userController.getUsersList)

//Consult User
router.get('/:_id',auth, userController.getUserById);

router.get('/', function(req, res, next) {
  res.send('users list page !'); 
});

// Read connected user
router.get('/auth/me', auth,  userController.getConnectedUser);


//login
router.post('/login', userController.login);

//verify email exist or not
router.get('/existPhone/:phone', userController.existPhone);

//verify phone exist or not
router.get('/existEmail/:email', userController.existEmail);

//logout
router.post('/logout', auth, userController.logout);

router.get('/getById/:id',userController.getUserByIdd)

module.exports = router;

const express = require('express');
const forgetRouter = express.Router();
const forgetPasswordMail = require('../controllers/ForgetPasswordMail');

forgetRouter.put('/' , forgetPasswordMail.sendps);
forgetRouter.put('/verif',forgetPasswordMail.verifps, );
forgetRouter.put('/changeps', forgetPasswordMail.changeps);

module.exports = forgetRouter;

//
//
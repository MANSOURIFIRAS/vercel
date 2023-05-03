// Import packages
const express = require("express");
const home = require("./routes/home");

const cors = require('cors');

const app = express();
const passport = require('passport');
const multer = require('multer');

var cookieSession = require('cookie-session');//
require('./src/Presentation/middlwares/passport');


var usersRouter = require('./src/Presentation/routes/users');
var contractroutes=require('./src/Presentation/routes/contractroutes');
var productsRouter = require('./src/Presentation/routes/products');
var googleRouter = require('./src/Presentation/routes/googleAuth');
var shipmentroute=require('./src/Presentation/routes/shipmentroute');
var fbRouter = require('./src/Presentation/routes/fb');
var forgetPasswordMail = require('./src/Presentation/routes/forgetPasswordMail');

var FarmRouter = require('./src/Presentation/routes/farms');
var PlantRouter = require('./src/Presentation/routes/plants');
var AnimalRouter = require('./src/Presentation/routes/animals');
var ratingRouter = require('./src/Presentation/routes/rating');
var compostsRouter = require('./src/Presentation/routes/composts');
var commandsRouter = require('./src/Presentation/routes/commands');

var cookieSession = require('cookie-session');
const { json } = require( "body-parser");

app.use(
  multer({
    limits: { fieldSize: 100 * 1024 * 1024 },
    dest: 'uploads/',
  }).fields([
    { name: 'file', maxCount: 1 },
    { name: 'video', maxCount: 1 },
  ])
);
app.use(cors({
  origin: 'http://localhost:4000',
  methods: ['GET', 'POST', 'PUT', 'PATCH' , 'DELETE'],
  credentials: true 
}));



require('dotenv').config({ path: `${__dirname}/.env` });


app.use(cookieSession({
	name: 'google-auth-session',
	keys: ['key1', 'key2']
}));


app.use(json());
app.set("view engine","ejs")
const session = require('express-session')
const cookieParser = require('cookie-parser')



app.set("view engine","ejs")
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));
app.use(passport.initialize());
    app.use(passport.session()); 
    app.use(cookieParser());


app.use(express.json());




// Routes
app.use("/home", home);

// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
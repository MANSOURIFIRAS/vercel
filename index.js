// Import packages
const express = require("express");
const home = require("./routes/home");
const compostsRouter = require('./src/Presentation/routes/composts');


const cors = require('cors');

const app = express();
const passport = require('passport');
const multer = require('multer');

const cookieSession = require('cookie-session');//
require('./src/Presentation/middlwares/passport');




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
app.use("/composts", compostsRouter);

// connection
const port = 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));
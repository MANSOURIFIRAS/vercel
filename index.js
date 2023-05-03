// Import packages
const express = require("express");
const home = require("./routes/home");
const compostsRouter = require('./src/Presentation/routes/composts');



const app = express();
const multer = require('multer');

const cookieSession = require('cookie-session');//




const { json } = require( "body-parser");

app.use(
  multer({
    limits: { fieldSize: 100 * 1024 * 1024 },
  }).fields([
    { name: 'file', maxCount: 1 },
    { name: 'video', maxCount: 1 },
  ])
);






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
app.use(cookieParser());



app.use(express.json());


const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect(
  'mongodb+srv://BioUpDataBase:4CB4OrcVWrlP1LvW@bioup.gkbagbx.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true
  },
  console.log('connected to database !!!!'),
);



// Routes
app.use("/home", home);
app.use("/composts", compostsRouter);

// connection
const port = 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));
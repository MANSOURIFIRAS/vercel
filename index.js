// Import packages
const express = require("express");
const home = require("./routes/home");
const compostsRouter = require('./src/Presentation/routes/composts');
// const usersRouter = require('./src/Presentation/routes/users');
const contractroutes=require('./src/Presentation/routes/contractroutes');
const productsRouter = require('./src/Presentation/routes/products');
// const googleRouter = require('./src/Presentation/routes/googleAuth');
const shipmentroute=require('./src/Presentation/routes/shipmentroute');
// const fbRouter = require('./src/Presentation/routes/fb');
const forgetPasswordMail = require('./src/Presentation/routes/forgetPasswordMail');

const FarmRouter = require('./src/Presentation/routes/farms');
const PlantRouter = require('./src/Presentation/routes/plants');
const AnimalRouter = require('./src/Presentation/routes/animals');
const ratingRouter = require('./src/Presentation/routes/rating');
const commandsRouter = require('./src/Presentation/routes/commands');


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


app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));
const cookieParser = require('cookie-parser')
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
// app.use('/users', usersRouter);
app.use('/products', productsRouter);
// app.use('/google', googleRouter);
app.use('/forget', forgetPasswordMail)
// app.use('/fb', fbRouter);
app.use('/contract',contractroutes);
app.use('/farms',FarmRouter);
app.use('/plants',PlantRouter);
app.use('/animals',AnimalRouter);
app.use('/rating',ratingRouter)
app.use('/commands',commandsRouter)
app.use('/shipment',shipmentroute);

// connection
const port = 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));
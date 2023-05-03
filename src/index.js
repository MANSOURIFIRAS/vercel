

const express = require('express');

// const connect = require('./Infrastructure/Database/mongodb');
// const makeCreateUser = require('./Application/UseCases/user/createUser');
// const UserRepository = require('./Domain/IRepositories/UserRepository');
// const makeUserController = require('./Presentation/Controllers/userController');
// const makeUserRoutes = require('./Presentation/Routes/userRoutes');
// const UserModel = require('./Infrastructure/Models/UserModel');
const cors = require('cors');

const app = express();
const passport = require('passport');
const multer = require('multer');

var cookieSession = require('cookie-session');//
require('./Presentation/middlwares/passport');

// initial route
app.get("/", (req, res) => {
  res.json({ message: "School space backend initial ..." });
});
var usersRouter = require('./Presentation/routes/users');
var contractroutes=require('./Presentation/routes/contractroutes');
var productsRouter = require('./Presentation/routes/products');
var googleRouter = require('./Presentation/routes/googleAuth');
var shipmentroute=require('./Presentation/routes/shipmentroute');
var fbRouter = require('./Presentation/routes/fb');
var forgetPasswordMail = require('./Presentation/routes/forgetPasswordMail');

var FarmRouter = require('./Presentation/routes/farms');
var PlantRouter = require('./Presentation/routes/plants');
var AnimalRouter = require('./Presentation/routes/animals');
var ratingRouter = require('./Presentation/routes/rating');
var compostsRouter = require('./Presentation/routes/composts');
var commandsRouter = require('./Presentation/routes/commands');
var shipmentroute=require('./Presentation/routes/shipmentroute');

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

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect(
  'mongodb+srv://BioUpDataBase:4CB4OrcVWrlP1LvW@bioup.gkbagbx.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true
  },
  console.log('connected to database !!!!'),
);


app.use(express.json());



app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/google', googleRouter);
app.use('/forget', forgetPasswordMail)
app.use('/fb', fbRouter);
app.use('/forget', forgetPasswordMail);
app.use('/contract',contractroutes);
app.use('/farms',FarmRouter);
app.use('/plants',PlantRouter);
app.use('/animals',AnimalRouter);
app.use('/rating',ratingRouter)
app.use('/composts',compostsRouter)
app.use('/commands',commandsRouter)
app.use('/shipment',shipmentroute);





// Start the server

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

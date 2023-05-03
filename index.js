// Import packages
const express = require("express");
const home = require("./routes/home");

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

app= express();


app.use(express.json());




// Routes
app.use("/home", home);

// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
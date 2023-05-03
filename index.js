// Import packages
const express = require("express");
const home = require("./routes/home");
const compostsRouter = require('./src/Presentation/routes/composts');



const app = express();

const cookieSession = require('cookie-session');//




const { json } = require( "body-parser");







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




app.use(express.json());




// Routes
app.use("/home", home);
app.use("/composts", compostsRouter);

// connection
const port = 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));
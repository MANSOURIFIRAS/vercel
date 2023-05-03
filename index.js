// Import packages
const express = require("express");
const home = require("./routes/home");
const compostsRouter = require('./src/Presentation/routes/composts');



app= express();


app.use(express.json());




// Routes
app.use("/home", home);
app.use("/composts", compostsRouter);

// connection
const port = 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));
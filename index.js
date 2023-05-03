// Import packages
const express = require("express");
const home = require("./routes/home");



app= express();


app.use(express.json());




// Routes
app.use("/home", home);

// connection
const port = 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));
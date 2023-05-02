const mongoose = require('mongoose');
require('dotenv').config({ path: `${__dirname}/.env` });
mongoose.connect(
  `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_CLUSTER}/?retryWrites=true&w=majority`,
  console.log('connected to database !!!!'),
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);
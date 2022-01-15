// URI Configuration
require('dotenv').config();

// Main Imports
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require("cors");

// Root Imports
// const Routes = require('./routes/posts');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Following line needs to be below the above bodyParser stuff
// app.use('/', Routes);

const CONNECTION_URL = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@meal-drop-server.tmlr2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}\nMongo DB Connection Established`)))
  .catch((error) => console.log(`Error on server run: ${error.message}`));

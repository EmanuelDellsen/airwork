require('dotenv').config();
//Backend based on https://www.digitalocean.com/community/tutorials/nodejs-crud-operations-mongoose-mongodb-atlas
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

app.use(express.json());

//Get keys
const username = process.env.MONGODB_ATLAS_USERNAME;
const password = process.env.MONGODB_ATLAS_PASSWORD;
const database = process.env.MONGODB_ATLAS_DATABASE_NAME;
console.log(process.env.MONGODB_ATLAS_USERNAME)
console.log(password)
console.log(database)



const uri = `mongodb+srv://${username}:${password}@clusterairwork-wtr11.mongodb.net/${database}?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
/*
//Setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose');
const app = express();
var corsOptions = {
  origin: "http://localhost:8081"
};

//Settings
app.use(cors(corsOptions));
app.use(bodyParser.json()); // parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded

//Get keys
var username = process.env.MONGODB_ATLAS_USERNAME;
var password = process.env.MONGODB_ATLAS_PASSWORD;
var database = process.env.MONGODB_ATLAS_DATABASE_NAME;
const PORT = process.env.PORT || 8080;

//Connect to MongoDB Atlas database
mongoose.connect(`mongodb+srv://${username}:${password}@clusterairwork-wtr11.mongodb.net/${database}?retryWrites=true&w=majority`, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

//Localize connection to db
const connection = mongoose.connection;

//Listener to notify when db-connection is established
connection.once("open", uri => {
  console.log("MongoDB database connections established");
});

//PLACE ROUTES HERE

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to AirWork backend!" });
});

// Start server, set port
app.listen(PORT, () => {
  console.log(`AirWork Backend-server`);
  console.log(``);
  console.log(`Express server listening on port ${PORT}.`);
  console.log(`Backend: http://localhost:${PORT}`);
});

/*
var express = require('express');
const connectDB = require('./config/db');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var cors = require('cors');
var history = require('connect-history-api-fallback');
const config = require('config');
const mongoURI = config.get('mongoURI');

//var usersController = require('./routes/api/users');
//var usersAuthController = require('./routes/api/users-auth');


// Variables
var port = process.env.PORT || 3000;

//Connect to DB
connectDB();

// Create Express app
var app = express();
// Parse requests of content-type 'application/json'
app.use(bodyParser.json());
// HTTP request logger
app.use(morgan('dev'));
// Enable cross-origin resource sharing for frontend must be registered before api
app.options('*', cors());
app.use(cors());

// Define routes
app.get('/api', function(req, res) {
  res.json({ message: 'Welcome to AirWork server' });
});

//app.use('/api/users', usersController);
//app.use('/api/users-auth', usersAuthController);

// Catch all non-error handler for api (i.e., 404 Not Found)
app.use('/api/*', function(req, res) {
  res.status(404).json({ message: 'Not Found'});
});

// Configuration for serving frontend in production mode
// Support Vuejs HTML 5 history mode
app.use(history());
// Serve static assets
var root = path.normalize(__dirname + '/..');
var client = path.join(root, 'client', 'dist');
app.use(express.static(client));

// Error handler (i.e., when exception is thrown) must be registered last
var env = app.get('env');
// eslint-disable-next-line no-unused-vars

app.use(function(err, req, res, next) {
  console.error(err.stack);
  var err_res = {
    message: err.message,
    error: {}
  };
  if (env === 'development') {
    err_res['error'] = err;
  }
  res.status(err.status || 500);
  res.json(err_res);
});

app.listen(port, function(err) {
  if (err) throw err;
  console.log(`Express server listening on port ${port}, in ${env} mode`);
  console.log(`Backend: http://localhost:${port}/api/`);
  console.log(`Frontend (production): http://localhost:${port}/`);
});

module.exports = app;
*/
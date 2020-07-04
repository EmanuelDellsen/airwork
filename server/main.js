//Backend based on https://www.digitalocean.com/community/tutorials/nodejs-crud-operations-mongoose-mongodb-atlas

//Get all backend running serices
const express = require('express');
const mongoose = require('mongoose');

//Set settings
require('dotenv').config();
const app = express();
const PORT = 5000;
app.use(express.json()); // make sure it will be in json format

//Get all routes
const workOpportunityRoute = require('./routes/workOpportunityRoute.js');

//Get keys
const username = process.env.MONGODB_ATLAS_USERNAME;
const password = process.env.MONGODB_ATLAS_PASSWORD;
const database = process.env.MONGODB_ATLAS_DATABASE_NAME;

//Get uri to db
const uri = `mongodb+srv://${username}:${password}@airwork-cluster.nnhrk.mongodb.net/${database}?retryWrites=true&w=majority`;

//Connect to db
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

//Interface db connection
const connection = mongoose.connection;

//Listener to notify when db-connection is established
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

//Introduction rotue
app.get("/", (req, res) => {
  res.json({ message: "Welcome to AirWork backend!" });
});

//All routes in use
app.use(workOpportunityRoute);

// Catch all non-error handler for api (i.e., 404 Not Found)
app.use('/*', function(req, res) {
  res.status(404).json({ message: 'Not Found'});
});

// Start server, set port
app.listen(PORT, () => {
  console.log(`AirWork Backend-server`);
  console.log(``);
  console.log(`Express server listening on port ${PORT}.`);
  console.log(`Backend: http://localhost:${PORT}`);
});
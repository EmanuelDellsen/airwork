// backend based on https://www.digitalocean.com/community/tutorials/nodejs-crud-operations-mongoose-mongodb-atlas

// get all backend running serices
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// get backup-service
var backupService = require("./services/backup_db.js");
var driveService = require("./services/drive_api.js");
// get arguments for backup script
var args = process.argv.slice(2);

// set settings
require("dotenv").config(); // required to be able to fetch env values
const app = express();
const PORT = 5000;
app.use(express.json()); // make sure it will be in json format
app.use(cors()); // enable cross-origin resource sharing

// get all routes
const authRoute = require("./routes/authRoute.js");
const workOpportunityRoute = require("./routes/workOpportunityRoute.js");
const userRoute = require("./routes/userRoute.js")

// get keys
const username = process.env.MONGODB_ATLAS_USERNAME;
const password = process.env.MONGODB_ATLAS_PASSWORD;
const database = process.env.MONGODB_ATLAS_DATABASE_NAME;

// get uri to db
const uri = `mongodb+srv://${username}:${password}@airwork-cluster.nnhrk.mongodb.net/${database}?retryWrites=true&w=majority`;

/* connect to MongoDB Atlas Cloud Server
@ useNewUrlParser : required to be able to parse connection strings
@ useUnifiedTopology : required for mongoose to be able to monitor server
@ useFindAndModify : required to be able to use methods update methods such as findByIdAndUpdate
*/
function connect() {
  setTimeout(function() {
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      connectTimeoutMS: 10000, //give up initial connection after 10 seconds
    });
  }, 10000);
}
// call connect
connect();

// interface db connection
const connection = mongoose.connection;

// listener to notify when db-connection is established
connection.on("error", function() {
  // triggered when an error is found
  console.log("- Status: Failed to connect to MongoDB!");
  console.log(`  @ ${new Date().toString()}`);

  // reconnect
  connect();
});
connection.once("open", function() {
  // triggered when connection is open (final state)
  console.log("- Status: Successfully opened connection to MongoDB!");
  console.log(`  @ ${new Date().toString()}`);
});
connection.on("connecting", function() {
  console.log("- Status: Connecting to MongoDB!");
  console.log(`  @ ${new Date().toString()}`);
});
connection.on("connected", function() {
  console.log("- Status: Connected to MongoDB!");
  console.log(`  @ ${new Date().toString()}`);
});
connection.on("reconnected", function() {
  console.log("- Status: Reconnected to MongoDB!");
  console.log(`  @ ${new Date().toString()}`);
});
connection.on("disconnected", function() {
  // triggered before error
  console.log("- Status: Disconnected to MongoDB!");
  console.log(`  @ ${new Date().toString()}`);
});

// introduction rotue
app.get("/", (req, res) => {
  res.json({ message: "Welcome to AirWork backend!" });
});

// all routes in use
app.use(authRoute);
app.use(workOpportunityRoute);
app.use(userRoute);

// catch all non-error handler for api (i.e., 404 Not Found)
app.use("/*", function(req, res) {
  res.status(404).json({ message: "Not Found" });
});

// start server, set port
app.listen(PORT, () => {
  console.log(`AirWork Backend-server`);
  console.log(``);
  console.log(`Express server listening on port ${PORT}.`);
  console.log(`Backend: http://localhost:${PORT}`);
});

// check if should run backup
if (args[0] == "backup") {

  // download collections
  backupService.run(connection);

  // upload collections
  driveService.run();

}

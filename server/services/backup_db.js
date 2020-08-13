// google drive upload instructions: https://developers.google.com/drive/api/v3/quickstart/nodejs

// file system module to perform file operations
const fs = require("fs");

async function getCollection(connection, element) {
  try {
    // get cursor to all documents in collection
    let cursor = await connection.collection(element).find({});

    // array to store json values
    let store = [];

    // loop over collections, await required
    await cursor.forEach((obj) => {
      // stringify JSON Object
      var jsonContent = JSON.stringify(obj);

      // push to array
      store.push(jsonContent);
    });

    // write to file
    fs.writeFile(`${element}.json`, store, "utf8", function(err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }
    
    // upload file to google drive

    
    });
  } catch (error) {
    console.log("Error in function");
  }
}

async function readJsonFile(element) {
  var obj;
  fs.readFile(`${element}.json`, "utf8", function(err, data) {
    if (err) throw err;
    obj = JSON.parse(data);

    console.log(obj);
  });
}

var methods = {
  run: function(connection) {
    // get all collections
    var collections = connection.collections;

    // get all names of collections
    var names = Object.keys(collections);

    // loop over names, save one file per each collection
    names.forEach((element) => {
      getCollection(connection, element);
    });
  },
};

module.exports = methods;

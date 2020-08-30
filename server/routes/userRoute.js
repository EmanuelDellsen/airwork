// set single point of name of route
const nameOfRoute = "user";

const express = require("express");
const Model = require(`../models/${nameOfRoute}Model`);
const app = express();

// get all
app.get(`/${nameOfRoute}`, async (req, res) => {
  //initalize param obj, null if not used
  var obj = {};

  //check if there are params
  if (req.query[0] !== undefined) {
    //setup params
    var params = req.query[0];
    obj = JSON.parse(params);
  }

  //setup query
  const query = Model.find(obj);

  //execute query, return to docs variable
  const docs = await query;

  try {
    //check if found any document
    if (docs.length == 0) {
      //if not found any document, return 404
      res.status(404).json();
    } else {
      //if found 1-* document, return all documents
      res.send(docs);
      console.log(docs);
    }
  } catch (err) {
    //if error, return 500
    res.status(500).send(err);
  }
});

//get one
app.get(`/${nameOfRoute}/:id`, async (req, res) => {
  //searchs for document in db by id
  const doc = await Model.findById(req.params.id);
  try {
    //check if found any document
    if (doc.length == 0) {
      //if no document found, return 404
      res.status(404).json();
    } else {
      //if document found, return document
      res.send(doc);
    }
  } catch (err) {
    //if error, return 500
    res.status(500).send(err);
  }
});

//post one
app.post(`/${nameOfRoute}`, async (req, res) => {
  //creates new object
  const new_object = new Model(req.body);
  try {
    //saves new object to db
    await new_object.save();
    //returns new object
    res.send(new_object);
  } catch (err) {
    //if error, return 500
    res.status(500).send(err);
  }
});

//update one
app.patch(`/${nameOfRoute}/:id`, async (req, res) => {
  //searches for document by id and updates directly in db if found
  //option: ' {new: true} ' returns the updated document as the payload
  Model.findByIdAndUpdate(
    req.params.id,
    req.body, {
      new: true,
    },
    function (err, doc) {
      //check if errors occurs
      if (err) {
        //if error, return 500
        res.status(500).send(err);
      } else {
        //check if payload has content
        if (doc.length == 0) {
          //if payload is empty, return 404
          res.status(404).json();
        } else {
          //if document is found and updated, return document
          res.send(doc);
        }
      }
    }
  );
});

module.exports = app;
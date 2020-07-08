const express = require("express");
const Model = require("../models/WorkOpportunityModel");
const app = express();

//get all
app.get("/workopportunity", async (req, res) => {
  //search for all documents of model
  const payload = await Model.find({});
  try {
    //check if found any document
    if (payload == null) {
      //if not found any document, return 404
      res.status(404).json();
    } else {
      //if found 1-* document, return all documents
      res.send(payload);
    }
  } catch (err) {
    //if error, return 500
    res.status(500).send(err);
  }
});

//get one
app.get("/workopportunity/:id", async (req, res) => {
  //searchs for document in db by id
  const payload = await Model.findById(req.params.id);
  try {
    //check if found any document
    if (payload == null) {
      //if no document found, return 404
      res.status(404).json();
    } else {
      //if document found, return document
      res.send(payload);
    }
  } catch (err) {
    //if error, return 500
    res.status(500).send(err);
  }
});

//post one
app.post("/workopportunity", async (req, res) => {
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
app.patch("/workopportunity/:id", async (req, res) => {
  //searches for document by id and updates directly in db if found
  //option: ' {new: true} ' returns the updated document as the payload
  await Model.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    function(err, payload) {
      //check if errors occurs
      if (err) {
        //if error, return 500
        res.status(500).send(err);
      } else {
        //check if payload has content
        if (payload == null) {
          //if payload is empty, return 404
          res.status(404).json();
        } else {
          //if document is found and updated, return document
          res.send(payload);
        }
      }
    }
  );
});

module.exports = app;

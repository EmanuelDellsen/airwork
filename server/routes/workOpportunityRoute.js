const express = require("express");
const Model = require("../models/WorkOpportunityModel");
const app = express();
const mailer = require("./mailerRoute");
const mailOptions = mailer.mailOptions;
const newApplicantEmail = mailer.newApplicantEmail;

//get all
app.get("/workopportunity", async (req, res) => {

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

  let emailOptions = mailOptions("emanuel", "emanuel.dellsen@gmail.com", "test", "test");
  newApplicantEmail(emailOptions);
  try {
    //check if found any document
    if (docs.length == 0) {
      //if not found any document, return 404
      res.status(404).json();
    } else {
      //if found 1-* document, return all documents
      res.send(docs);
    }
  } catch (err) {
    //if error, return 500
    res.status(500).send(err);
  }
});

//get one
app.get("/workopportunity/:id", async (req, res) => {
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
          //here we should maybe use the emailing service to send an email with the patch information to the owner of the document?
          let emailOptions = mailer.mailOptions("emanuel", "emanuel.dellsen@gmail.com", "test", "test");
          mailer.newApplicantEmail(emailOptions);
        }
      }
    }
  );
});

module.exports = app;

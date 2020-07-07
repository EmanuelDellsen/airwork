const express = require("express");
const Model = require("../models/WorkOpportunityModel");
const app = express();

//get all
app.get("/workopportunity", async (req, res) => {
  const payload = await Model.find({});
  try {
    //check if found any document
    if (payload == null) {
      res.status(404).json();
    } else {
      res.send(payload);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

//get one
app.get("/workopportunity/:id", async (req, res) => {
  const payload = await Model.findById(req.params.id);

  try {
    //check if found any document
    if (payload == null) {
      res.status(404).json();
    } else {
      res.send(payload);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

//post one
app.post("/workopportunity", async (req, res) => {
  const new_object = new Model(req.body);

  try {
    await new_object.save();
    res.send(new_object);
  } catch (err) {
    res.status(500).send(err);
  }
});

//update one
app.patch("/workopportunity:id", async (req, res) => {
  try {
    console.log("hello sir");
    const payload = Model.findByIdAndUpdate(req.params.id, req.body);
    //check if found any document
    if (payload == null) {
      res.status(404).json();
    } else {
      await payload.save();
      res.send(payload);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app;

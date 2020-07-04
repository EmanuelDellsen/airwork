const express = require('express');
const Model = require('../models/WorkOpportunityModel');
const app = express();

//get all
app.get('/workopportunity', async (req, res) => {
  const payload = await Model.find({});
  try {
    res.send(payload);
  } catch (err) {
    res.status(500).send(err);
  }
});

//get one
app.get('/workopportunity/:id', async (req, res) => {
  const payload = await Model.findById(req.params.id);

  //check out unhandle exception here
  //handle when not found
  if(payload == null){
    res.status(404).json();
  }

  try {
    res.send(payload);
  } catch (err) {
    res.status(500).send(err);
  }
});

//post one
app.post('/workopportunity', async (req, res) => {
  const new_object = new Model(req.body);

  try {
    await new_object.save();
    res.send(new_object);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app
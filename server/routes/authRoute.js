const express = require("express");
//const Model = require("../models/WorkOpportunityModel");
const app = express();
var axios = require("axios");

//get all
app.post("/auth/google", async (req, res) => {
  axios
    .post(
      process.env.GOOGLE_API_URL,
      {
        client_id: process.env.GOOGLE_API_CLIENT_ID,
        client_secret: process.env.GOOGLE_API_CLIENT_SECRET,
        code: req.body.code,
        redirect_uri: req.body.redirectUri,
        grant_type: "authorization_code",
      },
      { "content-type": "application/x-www-form-urlencoded" }
    )
    .then(function(response) {
      var responseJson = response.data;
      res.json(responseJson);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
});

//get userinfo
app.get("/auth/userinfo/:access_token", async (req, res) => {
  axios
    .get(
      `${process.env.GOOGLE_API_OAUTH_URL}?alt=json&access_token=${req.params.access_token}`
    )
    .then(function(response) {
      var data = response.data;
      res.json(data);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
});

module.exports = app;

const express = require("express");
const UserModel = require("../models/userModel");
const bcrypt = require('bcryptjs')
const app = express();
var axios = require("axios");
const jsonwebtoken = require("jsonwebtoken");

//get all
app.post("/auth/google", async (req, res) => {
  axios
    .post(
      process.env.GOOGLE_API_URL, {
      client_id: process.env.GOOGLE_API_CLIENT_ID,
      client_secret: process.env.GOOGLE_API_CLIENT_SECRET,
      code: req.body.code,
      redirect_uri: req.body.redirectUri,
      grant_type: "authorization_code",
    }, {
      "content-type": "application/x-www-form-urlencoded"
    }
    )
    .then(function (response) {
      var responseJson = response.data;
      res.json(responseJson);
    })
    .catch(function (err) {
      console.log(err)
      res.status(500).json(err);
    });
});

//get userinfo
app.get("/auth/userinfo/:access_token", async (req, res) => {
  axios
    .get(
      `${process.env.GOOGLE_API_OAUTH_URL}?alt=json&access_token=${req.params.access_token}`
    )
    .then(function (response) {
      var data = response.data;
      res.json(data);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
});

app.post("/auth/user", async (req, res) => {

  console.log(req.body, "req.body in authRoute")
  const { email, password } = req.body.newUser
  console.log(email, password)
  UserModel.findOne({ email }, async (err, user) => {
    if (err) {
      return res.status(401).json({ errors: [{ message: "Error in find one" }] });
    }
    if (!user) {
      return res.status(401).json({ errors: [{ message: "User does not exist" }] });
    }
    const isItAMatch = await bcrypt.compare(password, user.password);
    if (!isItAMatch) {
      return res.status(401).json({ errors: [{ message: "Invalid credentials" }] });
    }
    const payload = {
      user: {
        id: user.id
      }
    };
    jsonwebtoken.sign(payload, payload, process.env.JSON_WEBTOKEN_SECRET), {
      expiresIn: 10000
    }, (error, token) => {
      if (error) throw error;
      console.log(user, "inside users auth")
      res.status(201).json({ message: "Successfully logged in user", token, user })
    }
  })
})

module.exports = app;
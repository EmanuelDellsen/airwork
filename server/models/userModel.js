const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    given_name: {
        type: String,
        required: true,
    },
    family_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
        //validate email
    },
    profile_picture: {
        type: String,
        required: false
    },
    // user mongoose _id?
    invited_by: {
        type: String,
        required: true,
    },
    rating: {
        type: String,
        required: false
    },
    // user mongoose _id?
    recommended_by: [{
        type: String,
        required: false
    }],
    //applicantion mongoose _id ? 
    completed_jobs: [{
        type: String,
        required: false
    }]


});

const model = mongoose.model("user", schema);
module.exports = model;
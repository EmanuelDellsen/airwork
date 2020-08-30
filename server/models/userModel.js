const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    googleid: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false,
    },
    given_name: {
        type: String,
        required: false,
    },
    family_name: {
        type: String,
        required: false,
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
    invited_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    rating: {
        type: Number,
        default: 0
    },
    recommendations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "recommendation"
    }],
    completed_jobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "workopportunity"
    }],
    isActive: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        required: false
    },
});

const model = mongoose.model("user", schema);
module.exports = model;
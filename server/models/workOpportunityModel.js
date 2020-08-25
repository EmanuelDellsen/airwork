const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  start_date_and_time: {
    type: Date,
    required: true,
  },
  end_date_and_time: {
    type: Date,
    required: true,
  },
  coordinates: {
    lng: {
      type: Number,
      required: true,
    },
    lat: {
      type: Number,
      required: true,
    },
  },
  formatted_address: {
    type: String,
    required: true,
  },
  pay: {
    type: Number,
    required: true,
    validate(value) {
      if (value <= 0) throw new Error("Pay cannot be negative or zero.");
    },
  },
  description: {
    type: String,
    default: "No description",
    required: true,
  },
  applicants: [{
    type: Object,
    required: false,
  }, ],
  creator: {
    type: Object,
    required: true,
  },
});

const model = mongoose.model("workOpportunity", schema);
module.exports = model;
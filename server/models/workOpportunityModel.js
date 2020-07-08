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
  location: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
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
  company: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
});

const model = mongoose.model("workOpportunity", schema);
module.exports = model;
const mongoose = require("mongoose");
const entrySchema = new mongoose.Schema({
  bmi: {
    type: Number,
    required: true
  },
  bodyFat: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = NewEntry = mongoose.model("newentry", entrySchema);

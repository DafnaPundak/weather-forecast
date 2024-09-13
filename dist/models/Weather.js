const mongoose = require('mongoose');
const weatherSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true
  },
  temperature: Number,
  description: String,
  date: {
    type: Date,
    default: Date.now
  },
  icon: String
});
module.exports = mongoose.model('Weather', weatherSchema);
'use strict';
const mongoose = require('mongoose');
module.exports = new mongoose.Schema({
  text: {
    required: true,
    type: String
  },
  correct: {
    type: Boolean,
    default: false
  },
  feedback: {
    type: String,
    required: true
  }
});

'use strict';
const mongoose=require('mongoose');
module.exports = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: String,
  body: {
    type: String,
    required: true
  }
});

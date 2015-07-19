'use strict';
const mongoose=require('mongoose');
const ExampleSchema = require('./example');
const ExtraSchema = require('./extra');
module.exports = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  subtitle: String,
  body: {
    type: String,
    required: true
  },
  examples: [ExampleSchema],
  extras: [ExtraSchema]
});

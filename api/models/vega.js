'use strict';
const mongoose=require("mongoose");
module.exports = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  source: {
    method: {
      type: String,
      default: 'GET',
      enum: ['GET','POST']
    },
    url: {
      type: String,
      required: true
    },
    params: {}
  },
  fields: [],
  spec: {}
});

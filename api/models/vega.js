'use strict';
const mongoose=require("mongoose");
module.exports = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  fields: [],
  spec: {}
});

'use strict';
const mongoose=require('mongoose');
module.exports = mongoose.Schema({
  group: {
    required: true,
    type: String
  },
  name: {
    required: true,
    type: String
  }
});

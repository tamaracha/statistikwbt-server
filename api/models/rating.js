'use strict';
const mongoose=require('mongoose');
const ObjectId=mongoose.Schema.Types.ObjectId;
module.exports = new mongoose.Schema({
  unit: {
    type: ObjectId,
    required: true,
    ref: 'units',
    index: true
  },
  user: {
    type: ObjectId,
    required: true,
    ref: 'users',
    index: true
  },
  name: {
    type: String,
    required: true,
    enum: [
      'motivation',
      'success',
      'usability'
    ],
    index: true
  },
  value: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
});

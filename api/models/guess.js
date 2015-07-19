'use strict';
const mongoose=require('mongoose');
const ObjectId=mongoose.Schema.Types.ObjectId;
const ResponseSchema = require('./response');
module.exports = new mongoose.Schema({
  user: {
    type: ObjectId,
    required: true,
    ref: 'users'
  },
  test: {
    type: ObjectId,
    required: true,
    ref: 'tests'
  },
  responses: [ResponseSchema]
});

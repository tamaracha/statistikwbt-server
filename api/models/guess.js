'use strict';
const mongoose=require('mongoose');
const ObjectId=mongoose.Schema.Types.ObjectId;

const ResponseSchema = new mongoose.Schema({
  value: mongoose.Schema.Types.Mixed
});

const GuessSchema=new mongoose.Schema({
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

module.exports=mongoose.model('Guess',GuessSchema);
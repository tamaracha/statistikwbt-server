'use strict';
const mongoose=require('mongoose');

const SingleChoiceSchema=new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  choices: [{
    text: {
      type: String,
      required: true
    },
    correct: {
      type: Boolean,
      default: false
    },
    feedback: String
  }]
});

module.exports=mongoose.model('SingleChoice',SingleChoiceSchema);
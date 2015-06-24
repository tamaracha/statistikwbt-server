'use strict';
const mongoose=require('mongoose');

const MultipleChoiceSchema=new mongoose.Schema({
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
    feedback: {
      correct: String,
      incorrect: String
    }
  }]
});

module.exports=mongoose.model('MultipleChoice',MultipleChoiceSchema);
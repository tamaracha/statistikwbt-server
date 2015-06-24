'use strict';
const mongoose=require('mongoose');

const InputSchema=new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'fill'
  },
  correct: {
    type: String,
    required: true
  },
  feedback: {
    right: {
      type: String,
      required: true
    },
    wrong: {
      type: String,
      required: true
    }
  }
});

module.exports=mongoose.model('Input',InputSchema);
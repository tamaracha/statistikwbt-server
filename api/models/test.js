'use strict';
const mongoose=require('mongoose');
const $=require('../services/validate');

const TestSchema=new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['multiple','single','input']
  },
  choices: [{
    text: {
      required: true,
      type: String
    },
    correct: {
      type: Boolean,
      default: false
    },
    feedback: {
      type: String,
      required: true
    }
  }],
  unit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'unit',
    index: true
  },
  tags: [{
  text: {
      type: String,
      index: true
    }
  }]
});
TestSchema.path('choices').validate($.notEmpty);

module.exports=mongoose.model('Test',TestSchema);
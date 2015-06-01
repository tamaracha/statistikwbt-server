'use strict';
var mongoose=require('mongoose');
var $=require('../services/validate');

var TestSchema=new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['multiple choice','single choice','input']
  },
  options: [{
    text: {
      required: true,
      type: String
    },
    correct: {
      type: Boolean,
      required: true
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
    type: String,
    index: true
  }]
});
TestSchema.path('options').validate($.notEmpty);

module.exports=mongoose.model('Test',TestSchema);
'use strict';
const mongoose = require('mongoose');
const $ = require('../services/validate');
const _ = require('lodash');
const ChoiceSchema = require('./choice');
const TestSchema = module.exports = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['multiple','single','input']
  },
  choices: [ChoiceSchema],
  unit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'units',
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
TestSchema.statics.shuffle = function(conditions,projections,options){
  return this.find(
    conditions || null,
    projections || null,
    options || null
  ).lean().exec()
  .then(function(tests){
    if(tests.length > 1){
      tests=_.shuffle(tests);
    }
    _.each(tests,function(test){
      if(test.choices.length > 1){
        test.choices = _.shuffle(test.choices);
      }
    });
    return tests;
  });
};

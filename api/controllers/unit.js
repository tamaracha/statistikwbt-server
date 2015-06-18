'use strict';
var Unit=require('../models/unit');
var Test=require('../models/test');
var _=require('lodash');
var $=module.exports={};
var jsonpatch=require('fast-json-patch');

$.index=function *(){
  var units=yield Unit.find(
    this.query.conditions||null,
    this.query.projections||null,
    this.query.options||null
  ).lean().exec();
  this.body=units;
};

$.create=function *(){
  var unit=yield Unit.create(this.request.body);
  this.assert(unit,'unit not ceated',404);
  this.body=unit;
};

$.show=function *(){
  var unit=yield Unit.findById(
    this.params.unit,
    this.query.projections||null,
    this.query.options||null
  ).lean().exec();
  this.assert(unit,'unit not found',404);
  this.body=unit;
};

$.update=function *(){
  var unit=yield Unit.findById(this.params.unit).exec();
  this.assert(unit,'unit not found',404);
  var patch=jsonpatch.apply(unit,this.request.body);
  if(patch===true){
    yield unit.save();
    this.status=200;
  }
};

$.destroy=function *(){
  yield Unit.findByIdAndRemove(this.params.unit);
  this.status=200;
};

$.tests=function *(){
  var tests=yield Test.find({unit: this.params.unit}).exec();
  this.assert(tests,'not found',404);
  if(tests.length>1){tests=_.shuffle(tests);}
  _.each(tests,function(value){
    if(value.choices&&value.choices.length>1){
    var shuffledOptions=_.shuffle(value.choices);
    value.choices=shuffledOptions;
    }
  });
  this.body=tests;
};

$.createTest=function *(){
  var newTest=this.request.body;
  newTest.unit=this.params.unit;
  var test=yield Test.create(newTest);
  this.assert(test,'test not created',404);
  this.body=test;
};
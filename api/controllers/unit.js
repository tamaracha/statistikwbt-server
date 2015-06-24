'use strict';
const Unit=require('../models/unit');
const Test=require('../models/test');
const _=require('lodash');
const $=module.exports={};
const jsonpatch=require('fast-json-patch');

$.index=function *(){
  let units=yield Unit.find(
    this.query.conditions||null,
    this.query.projections||null,
    this.query.options||null
  ).lean().exec();
  this.body=units;
};

$.create=function *(){
  let unit=yield Unit.create(this.request.body);
  this.assert(unit,'unit not ceated',404);
  this.body=unit;
};

$.show=function *(){
  let unit=yield Unit.findById(
    this.params.unit,
    this.query.projections||null,
    this.query.options||null
  ).lean().exec();
  this.assert(unit,'unit not found',404);
  this.body=unit;
};

$.update=function *(){
  let unit=yield Unit.findById(this.params.unit).exec();
  this.assert(unit,'unit not found',404);
  let patch=jsonpatch.apply(unit,this.request.body);
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
  let tests=yield Test.find({unit: this.params.unit}).exec();
  this.assert(tests,'not found',404);
  if(tests.length>1){tests=_.shuffle(tests);}
  _.each(tests,function(value){
    if(value.choices&&value.choices.length>1){
    let shuffledOptions=_.shuffle(value.choices);
    value.choices=shuffledOptions;
    }
  });
  this.body=tests;
};

$.createTest=function *(){
  let newTest=this.request.body;
  newTest.unit=this.params.unit;
  let test=yield Test.create(newTest);
  this.assert(test,'test not created',404);
  this.body=test;
};
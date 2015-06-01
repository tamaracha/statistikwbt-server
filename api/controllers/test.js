'use strict';
var Test=require('../models/test');
var _=require('lodash');
var jsonpatch=require('fast-json-patch');
var $=module.exports={};

$.index=function *(){
  var tests=yield Test.find(
    this.query.conditions||null,
    this.query.projections||null,
    this.query.options||null
  ).lean().exec();
  tests=_.shuffle(tests);
  _.forEach(tests,function(test){
    test.options=_.shuffle(test.options);
  });
  this.body=tests;
};

$.create=function *(){
  var test=yield Test.create(this.request.body);
  this.assert(test,'test not created',404);
  this.status=200;
};

$.show=function *(){
  var test=yield Test.findById(this.params.test);
  this.assert(test,'test not found',404);
  this.body=test;
};

$.update=function *(){
  var test=yield Test.findById(this.params.test).exec();
  this.assert(test,'test not found',404);
  var patch=jsonpatch.apply(test,this.request.body);
  if(patch===true){
    yield test.save();
    this.status=200;
  }
};

$.destroy=function *(){
  yield Test.findByIdAndRemove(this.params.test).exec();
  this.status=200;
};

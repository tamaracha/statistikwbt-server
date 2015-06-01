'use strict';
var Unit=require('../models/unit');
var _=require('lodash');
var jsonpatch=require('fast-json-patch');
var ObjectId=require('mongoose').Types.ObjectId;
var $=module.exports={};

$.index=function *(){
  var unit=yield Unit.findById(
    this.params.unit,
    this.query.projections||null,
    this.query.options||null
  ).lean().exec();
  this.assert(unit,'unit not found',400);
  this.body=unit.topics;
};

$.create=function *(){
  var unit=yield Unit.findById(this.params.unit).exec();
  this.assert(unit,'unit not found',404);
  unit.topics.push(this.request.body);
  var newUnit=yield unit.save();
  this.body=newUnit.topics;
};

$.show=function *(){
  var unit=yield Unit.findById(this.params.unit,'topics').exec();
  this.assert(unit,'unit not found',404);
  var topic=unit.topics.id(this.params.topic);
  this.assert(topic,'topic not found',404);
  this.body=topic;
};

$.update=function *(){
  var unit=yield Unit.findById(this.params.unit).exec();
  this.assert(unit,'unit not found',404);
  var i=_.findIndex(unit.topics,{_id: ObjectId(this.params.topic)});
  this.assert(i>-1,'topic not found',404);
  var patch=jsonpatch.apply(unit.topics[i],this.request.body,true);
  if(patch===true){
    yield unit.save();
    this.status=200;
  }
};

$.destroy=function *(){
  var unit=yield Unit.findById(this.params.unit).exec();
  this.assert(unit,'unit not found',404);
  unit.topics.pull(this.params.topic);
  yield unit.save();
  this.status=200;
};

$.edit=function *(){
  var unit=yield Unit.findById(this.params.unit,'topics').exec();
  this.assert(unit,'unit not found',404);
  switch(this.request.body.action){
    case 'move': unit=yield unit.move('topics',this.params.topic,this.request.body.dir);
  }
  this.body=unit.topics;
};


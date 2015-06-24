'use strict';
const Unit=require('../models/unit');
const _=require('lodash');
const jsonpatch=require('fast-json-patch');
const ObjectId=require('mongoose').Types.ObjectId;
const $=module.exports={};

$.index=function *(){
  let unit=yield Unit.findById(
    this.params.unit,
    this.query.projections||null,
    this.query.options||null
  ).lean().exec();
  this.assert(unit,'unit not found',400);
  this.body=unit.topics;
};

$.create=function *(){
  let unit=yield Unit.findById(this.params.unit).exec();
  this.assert(unit,'unit not found',404);
  unit.topics.push(this.request.body);
  let newUnit=yield unit.save();
  let topic=newUnit.topics[newUnit.topics.length-1];
  this.body=topic;
};

$.show=function *(){
  let unit=yield Unit.findById(this.params.unit,'topics').exec();
  this.assert(unit,'unit not found',404);
  let topic=unit.topics.id(this.params.topic);
  this.assert(topic,'topic not found',404);
  this.body=topic;
};

$.update=function *(){
  let unit=yield Unit.findById(this.params.unit).exec();
  this.assert(unit,'unit not found',404);
  let i=_.findIndex(unit.topics,{_id: new ObjectId(this.params.topic)});
  this.assert(i>-1,'topic not found',404);
  let patch=jsonpatch.apply(unit.topics[i],this.request.body,true);
  if(patch===true){
    yield unit.save();
    this.status=200;
  }
};

$.destroy=function *(){
  let unit=yield Unit.findById(this.params.unit).exec();
  this.assert(unit,'unit not found',404);
  unit.topics.pull(this.params.topic);
  yield unit.save();
  this.status=200;
};

$.edit=function *(){
  let unit=yield Unit.findById(this.params.unit,'topics').exec();
  this.assert(unit,'unit not found',404);
  switch(this.request.body.action){
    case 'move': unit=yield unit.move('topics',this.params.topic,this.request.body.dir);
  }
  this.body=unit.topics;
};


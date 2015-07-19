'use strict';
const _=require('lodash');
const jsonpatch=require('fast-json-patch');
const ObjectId=require('mongoose').Types.ObjectId;
const $=module.exports={};

$.index=function *(){
  const unit = yield models.Unit.findById(
    this.params.unit,
    this.query.projections||null,
    this.query.options||null
  ).lean().exec();
  this.assert(unit,'unit not found',400);
  this.body=unit.topics;
};

$.create=function *(){
  const unit = yield models.Unit.findById(this.params.unit).exec();
  this.assert(unit,'unit not found',404);
  const topic = unit.topics.create(this.request.body);
  unit.topics.push(topic);
  yield unit.save();
  this.body=topic;
};

$.show=function *(){
  const unit = yield models.Unit.findById(this.params.unit,'topics').exec();
  this.assert(unit,'unit not found',404);
  const topic=unit.topics.id(this.params.topic);
  this.assert(topic,'topic not found',404);
  this.body=topic;
};

$.update=function *(){
  const unit = yield models.Unit.findById(this.params.unit).exec();
  this.assert(unit,'unit not found',404);
  const topic = unit.topics.pull(this.params.topic);
  this.assert(topic,'topic not found',404);
  const patch=jsonpatch.apply(topic,this.request.body,true);
  if(patch === true){
    unit.topics.push(topic);
    yield unit.save();
    this.status=200;
  }
  else{
    this.throw('patch not successful');
  }
};

$.destroy=function *(){
  const unit = yield models.Unit.findById(this.params.unit).exec();
  this.assert(unit,'unit not found',404);
  unit.topics.pull(this.params.topic);
  yield unit.save();
  this.status=200;
};

$.edit=function *(){
  this.assert(_.isString(this.request.body.action),'action is no string');
  this.assert(_.isString(this.request.body.dir),'dir is no string');
  const unit = yield models.Unit.findById(this.params.unit,'topics').exec();
  this.assert(unit,'unit not found',404);
  switch(this.request.body.action){
    case 'move': unit=yield unit.move('topics',this.request.body.topic,this.request.body.dir);
  }
  this.body = unit.topics;
};

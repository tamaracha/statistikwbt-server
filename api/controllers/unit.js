'use strict';
const _=require('lodash');
const $=module.exports={};
const jsonpatch=require('fast-json-patch');

$.index=function *(){
  const units = yield models.Unit.find(
    this.query.conditions||null,
    this.query.projections||null,
    this.query.options||null
  ).lean().exec();
  this.body=units;
};

$.create=function *(){
  const unit = yield models.Unit.create(this.request.body);
  this.assert(unit,'unit not created',404);
  this.body=unit;
};

$.show=function *(){
  const unit = yield models.Unit.findById(
    this.params.unit,
    this.query.projections||null,
    this.query.options||null
  ).lean().exec();
  this.assert(unit,'unit not found',404);
  this.body=unit;
};

$.update=function *(){
  const unit = yield models.Unit.findById(this.params.unit).exec();
  this.assert(unit,'unit not found',404);
  const patch = jsonpatch.apply(unit,this.request.body);
  if(patch===true){
    yield unit.save();
    this.status=200;
  }
  else{
    this.throw('patch not successful');
  }
};

$.destroy=function *(){
  yield models.Unit.findByIdAndRemove(this.params.unit);
  this.status=200;
};

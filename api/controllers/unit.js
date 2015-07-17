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

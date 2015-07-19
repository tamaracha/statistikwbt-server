'use strict';
const ObjectId = require('mongoose').Types.ObjectId;
const $ = module.exports = {};

$.index = function *index(){
  const specs = yield models.Vega.find(
    this.query.conditions || null,
    this.query.projections || null,
    this.query.options || null
  ).lean().exec();
  this.body=specs;
};

$.create = function *create(){
  const spec = yield models.Vega.create(this.request.body);
  this.assert(spec,'spec not created',404);
  this.body=spec;
};

$.show = function *show(){
  const valid = ObjectId.isValid(this.params.vega);
  let spec;
  if(valid){
    spec = yield models.Vega.findById(this.params.vega).lean().exec();
  }
  else{
    spec = yield models.Vega.findOne({name: this.params.vega}).lean().exec();
  }
  this.assert(spec,'spec not found',404);
  this.body=spec;
};

$.update = function *update(){
  const spec = yield models.Vega.findByIdAndUpdate(this.params.vega,this.request.body,{new: true});
  this.assert(spec,'no spec updated',404);
  this.body=spec;
}

$.destroy = function *destroy(){
  const spec = yield models.Vega.findByIdAndRemove(this.params.vega);
  this.assert(spec,'no spec removed',404);
  this.body=spec;
};

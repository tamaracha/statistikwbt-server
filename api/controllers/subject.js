'use strict';
const Subject=require('../models/subject');
const $ = module.exports = {};

$.index = function *index(){
  let subjects=null;
  if(this.query.search){
    subjects = yield Subject.find({
      name: new RegExp(this.query.search,'i')
    }).lean().exec();
  }
  else{
    subjects = yield Subject.find(
      this.query.conditions || null,
      this.query.projections || null,
      this.query.options || null
    ).lean().exec();
  }
  this.assert(subjects,'no subjects',404);
  this.body = subjects;
};

$.create = function *create(){
  let subject = yield Subject.create(this.request.body);
  this.assert(subject,'not created',404);
  this.body = subject;
};

$.show = function *show(){
  let subject = yield Subject.findById(this.params.subject).lean().exec();
  this.assert(subject,'not found',404);
  this.body = subject;
};

$.update = function *update(){
  let subject = yield Subject.findByIdAndUpdate(this.params.subject,this.request.body,{new: true}).exec();
  this.assert(subject,'not updated',404);
  this.body = subject;
};

$.destroy = function *destroy(){
  let subject = yield Subject.findByIdAndRemove(this.params.subject).exec();
  this.body = subject;
};

'use strict';
const _ = require('lodash');
const $ = module.exports = {};
$.index = function *index(){
  this.assert(this.query.search && _.isString(this.query.search),'no search string');
  const subjects = yield models.Subject.find({
    name: new RegExp(this.query.search,'i')
  }).lean().exec();
  this.assert(subjects,'no subjects',404);
  this.body = subjects;
};

$.create = function *create(){
  const subject = yield models.Subject.create(this.request.body);
  this.assert(subject,'not created',404);
  this.body = subject;
};

$.show = function *show(){
  const subject = yield models.Subject.findById(this.params.subject).lean().exec();
  this.assert(subject,'not found',404);
  this.body = subject;
};

$.update = function *update(){
  const subject = yield models.Subject.findByIdAndUpdate(this.params.subject,this.request.body,{
    new: true
  }).lean().exec();
  this.assert(subject,'not updated',404);
  this.body = subject;
};

$.destroy = function *destroy(){
  const subject = yield models.Subject.findByIdAndRemove(this.params.subject).lean().exec();
  this.body = subject;
};

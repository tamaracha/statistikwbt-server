'use strict';
const Subject=require('../models/subject');
const $={};

$.find=function *search(){
  let subjects=yield Subject.find({name: new RegExp(this.query.search,'i')});
  this.body=subjects;
};
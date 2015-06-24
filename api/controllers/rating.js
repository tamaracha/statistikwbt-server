'use strict';
const Rating=require('../models/rating');
const $=module.exports={};

$.create=function *create(){
  this.request.body.user=this.state.user._id;
  let rating=yield Rating.create(this.request.body);
  this.assert(rating,'rating not created',404);
  this.status=200;
};

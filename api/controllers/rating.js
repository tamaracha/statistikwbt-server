'use strict';
var Rating=require('../models/rating');
var $=module.exports={};

$.create=function *(){
  this.request.body.user=this.state.user._id;
  var rating=yield Rating.create(this.request.body);
  this.assert(rating,'rating not created',404);
  this.status=200;
};

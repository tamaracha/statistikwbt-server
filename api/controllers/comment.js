'use strict';
var Comment=require('../models/comment');
var $=module.exports={};

$.create=function *(){
  this.request.body.user=this.state.user._id;
  var comment=yield Comment.create(this.request.body);
  this.assert(comment,'comment not created',404);
  this.status=200;
};
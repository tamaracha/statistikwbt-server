'use strict';
const Comment=require('../models/comment');
const $=module.exports={};

$.create=function *create(){
  this.request.body.user=this.state.user._id;
  let comment=yield Comment.create(this.request.body);
  this.assert(comment,'comment not created',404);
  this.status=200;
};
'use strict';
const $=module.exports={};

$.create=function *create(){
  this.request.body.user=this.state.user._id;
  const comment = yield model.Comment.create(this.request.body);
  this.assert(comment,'comment not created',404);
  this.status=200;
};

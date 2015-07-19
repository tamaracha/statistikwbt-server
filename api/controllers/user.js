'use strict';
const $=module.exports={};

$.check=function *(){
  const users = yield models.User.find(this.query).lean().exec();
  this.assert(users.length>0,'no users found',404);
  this.status=200;
};

$.create=function *(){
  const user = yield models.User.create(this.request.body);
  this.body=user;
};

$.show=function *(){
  const user = yield models.User.findById(this.params.user).lean().exec();
  this.assert(user,'user not found',404);
  this.body=user;
};

$.update=function *(){
  const user = yield models.User.findById(this.params.user).exec();
  this.assert(user,'user not found',404);
  user=yield user.patch(this.request.body);
  this.status=200;
};

$.destroy=function *(){
  const user = yield models.User.findByIdAndRemove(this.params.user).exec();
  this.assert(user,'user not found',404);
  this.status=200;
};

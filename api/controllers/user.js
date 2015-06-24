'use strict';
const User=require('../models/user');
const $=module.exports={};

$.check=function *(){
  let users=yield User.find(this.query).lean().exec();
  this.assert(users.length>0,'no users found',404);
  this.status=200;
};

$.create=function *(){
  let user=yield User.create(this.request.body);
  this.body=user;
};

$.show=function *(){
  let user=yield User.findById(this.params.user).lean().exec();
  this.assert(user,'user not found',404);
  this.body=user;
};

$.update=function *(){
  let user=yield User.findById(this.params.user).exec();
  this.assert(user,'user not found',404);
  user=yield user.patch(this.request.body);
  this.status=200;
};

$.destroy=function *(){
  let user=yield User.findByIdAndRemove(this.params.user).exec();
  this.assert(user,'user not found',404);
  this.status=200;
};
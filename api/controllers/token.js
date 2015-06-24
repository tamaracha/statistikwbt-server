'use strict';
const auth=require('basic-auth');
const jwt=require('jsonwebtoken');
const config=require('config').get('jwt');
const User=require('../models/user');

module.exports.new=function *(){
  let login=auth(this.request);
  this.assert(login,'no authorization found',401);
  let user=yield User.findOne({email: login.name}).exec();
  this.assert(user,'email not found',404);
  let isMatch=yield user.validatePassword(login.pass);
  this.assert(isMatch,'incorrect password',401);
  let token=jwt.sign({_id: user._id},config.secret,config.options);
  this.body={
    token: token,
    _id: user._id
  };
};
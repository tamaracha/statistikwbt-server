'use strict';
const auth = require('basic-auth');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const config = require('config').get('jwt');

module.exports.new=function *(){
  let login=auth(this.request);
  this.assert(login,'no authorization found',401);
  this.assert(_.isString(login.name),'name is not a string',500);
  this.assert(_.isString(login.pass),'pass is not a string',500);
  const user = yield models.User.findOne({email: login.name},'+password').exec();
  this.assert(user,'email not found',404);
  const isMatch = yield user.validatePassword(login.pass);
  this.assert(isMatch,'incorrect password',401);
  const token=jwt.sign({
    _id: user._id,
    role: user.role
  },config.secret,config.options);
  this.body={
    token: token,
    _id: user._id
  };
};

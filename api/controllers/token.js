var auth=require('basic-auth');
var jwt=require("jsonwebtoken");
var config=require('config').get('jwt');
var User=require('../models/user');

module.exports.new=function *(){
  var login=auth(this.request);
  this.assert(login,'no authorization found',401);
  var user=yield User.findOne({email: login.name}).exec();
  this.assert(user,'email not found',404);
  var isMatch=yield user.validatePassword(login.pass);
  this.assert(isMatch,'incorrect password',401);
  var token=jwt.sign({_id: user._id},config.secret,config.options);
  this.body={
    token: token,
    _id: user._id
  };
};
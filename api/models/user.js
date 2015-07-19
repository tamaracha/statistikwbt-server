'use strict';
const mongoose=require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const validate=require('../services/validate');
const ObjectId=mongoose.Schema.Types.ObjectId;
const DoneSchema = require('./done');

const UserSchema=new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: validate.emailValidator,
    unique: true
  },
  password: {
    type: String,
    select: false,
    required: true,
    validate: validate.passwordValidator
  },
  role: {
    type: String,
    required: true
  },
  profile: {
    nickname: String,
    age: {
      type: Number,
      required: true
    },
    sex: {
      type: String,
      required: true,
      enum: ['male','female']
    },
    subject: {
      type: String,
      required: true
    },
    reasons: [{
      type: String,
      enum: ['interesse','langeweile','klausur']
    }]
  },
  akzeptanz: {
    ratings: [{
      type: ObjectId,
      ref: 'rating'
    }],
    comments: [{
      type: ObjectId,
      ref: 'comment'
    }]
  },
  done: [DoneSchema],
  views: [{
    type: ObjectId,
    ref: 'views'
  }]
});
UserSchema.pre('save',function(cb){
  const user = this;
  if(!user.isModified('password')){return cb();}
  bcrypt.hash(user.password,null,null,function(err,hash){
    if(err){
      return cb(err);
    }
    user.password = hash;
    return cb();
  });
});
UserSchema.methods.validatePassword=function(password){
  const user = this;
  return function(cb){
    bcrypt.compare(password,user.password,cb);
  };
};

module.exports=mongoose.model('User',UserSchema);
'use strict';
const mongoose=require('mongoose');
const bluebird=require('bluebird');
const bcrypt=bluebird.promisifyAll(require('bcrypt-nodejs'));
const validate=require('../services/validate');
const ObjectId=mongoose.Schema.Types.ObjectId;

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
      type: Number
    },
    sex: {
      type: String,
      enum: ['male','female']
    },
    subject: {
      type: String
    },
    reasons: [Boolean]
  },
  fsk: [{
    sessko: {
      type: [Number],
      required: true
    }
  }],
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
  complete: [{
    type: ObjectId,
    ref: 'unit'
  }],
  views: [{
    type: ObjectId,
    ref: 'view'
  }]
});
UserSchema.pre('save',function(cb){
  let user=this;
  if(!user.isModified('password')){return cb();}
  return bcrypt.hashAsync(user.password,null,null)
  .then(function(hash){
    user.password=hash;
    return cb();
  },function(e){
    return cb(e);
  });
});
UserSchema.methods.validatePassword=function(password){
  return bcrypt.compareAsync(password,this.password);
};

module.exports=mongoose.model('User',UserSchema);
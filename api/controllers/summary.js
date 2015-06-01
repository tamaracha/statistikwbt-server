'use strict';
var Rating=require('../models/rating');
var Comment=require('../models/comment');
var Guess=require('../models/guess');
var ObjectId=require("mongoose").Types.ObjectId
var _=require('lodash');
var $=module.exports={};

$.guesses=function *(){
  var guesses=yield Guess.aggregate([{
    $match: {
      user: ObjectId(this.state.user._id),
      unit: ObjectId(this.params.unit)
    }
  },{
    $sort: {
      _id: -1
    }
  },{
    $group: {
      _id: "$item",
      response: {$first: "$response"}
    }
  }]).exec();
  var data=_.chain(guesses)
  .indexBy('_id')
  .transform(function(result,value,key){
    result[key]=value.response;
  })
  .value();
  this.body=data;
};

$.akzeptanz=function *(){
  var ratings=yield Rating.aggregate([
  {
    $match: {
      "unit": ObjectId(this.params.unit),
      "user": ObjectId(this.state.user._id)
    }
  },
  {
    $sort: {
      "_id": -1
    }
  },{
    $group: {
      _id: "$name",
      value: {$first: "$value"}
    }
  }]);
  _.chain(ratings)
  .indexBy('_id')
  .transform(function(result,value,key){
    result[key]=value.value;
  })
  .value();
  var comment=yield Comment.findOne({
    user: this.status.user._id,
    unit: this.params.unit
  })
  .sort({_id: -1})
  .lean().exec();
  if(comment){data.comment=comment.value;}
  this.body=data;
};
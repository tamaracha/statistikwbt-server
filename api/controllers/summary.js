'use strict';
const Rating=require('../models/rating');
const Comment=require('../models/comment');
const Guess=require('../models/guess');
const ObjectId=require('mongoose').Types.ObjectId;
const _=require('lodash');
const $=module.exports={};

$.guesses=function *(){
  let guesses=yield Guess.aggregate([{
    $match: {
      user: new ObjectId(this.state.user._id),
      unit: new ObjectId(this.params.unit)
    }
  },
  {
    $sort: {
      _id: -1
    }
  },
  {
    $group: {
      _id: '$item',
      response: {$first: '$response'}
    }
  }]).exec();
  let data=_.chain(guesses)
  .indexBy('_id')
  .transform(function(result,value,key){
    result[key]=value.response;
  })
  .value();
  this.body=data;
};

$.akzeptanz=function *(){
  let ratings = yield Rating.aggregate([
  {
    $match: {
      'unit': new ObjectId(this.params.unit),
      'user': new ObjectId(this.state.user._id)
    }
  },
  {
    $sort: {
      '_id': -1
    }
  },{
    $group: {
      _id: '$name',
      value: {$first: '$value'}
    }
  }]).exec();
  ratings = _.chain(ratings)
  .indexBy('_id')
  .transform(function(result,value,key){
    result[key]=value.value;
  })
  .value();
  let comment=yield Comment.findOne({
    user: this.state.user._id,
    unit: this.params.unit
  })
  .sort({_id: -1})
  .lean().exec();
  if(comment){ratings.comment=comment.value;}
  this.body=ratings;
};

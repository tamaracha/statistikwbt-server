'use strict';
const mongoose=require('mongoose');
const ObjectId=mongoose.Schema.Types.ObjectId;
const _=require('lodash');
const TopicSchema = require('./topic');
const UnitSchema = module.exports = new mongoose.Schema({
  position: Number,
  title: {
    type: String,
    required: true,
    unique: true
  },
  subtitle: String,
  description: {
    type: String,
    required: true
  },
  requires: [{
    type: ObjectId,
    ref: 'unit'
  }],
  topics: [TopicSchema],
  views: [{
    type: ObjectId,
    ref: 'view'
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
  }
});
UnitSchema.methods.move=function(arr,_id,dir){
  let unit,a,b,tmp;
  unit=this;
  return new Promise(function(resolve,reject){
    if(!unit[arr]){return reject('array not found');}
    a=_.findIndex(unit[arr],{_id: mongoose.Types.ObjectId(_id)});
    if(a===-1){return reject('item not found');}
    switch(dir){
      case 'up':
        b=a-1;
        break;
      case 'down':
        b=a+1;
    }
    if(b<=-1||b>=unit.topics.length){return resolve(unit);}
    tmp=unit[arr][b];
    unit[arr].set(b,unit[arr][a]);
    unit[arr].set(a,tmp);
    return unit.save(function(e){
      return e ? reject(e) : resolve(unit);
    });
  });
};
UnitSchema.plugin(require('../plugins/date'));

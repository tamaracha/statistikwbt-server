'use strict';
const mongoose=require('mongoose');
const ObjectId=mongoose.Schema.Types.ObjectId;
const User=require('./user');
const Unit=require('./unit');

const RatingSchema=new mongoose.Schema({
  unit: {
    type: ObjectId,
    required: true,
    ref: 'unit'
  },
  user: {
    type: ObjectId,
    required: true,
    ref: 'user'
  },
  name: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
});
RatingSchema.index({
  unit: 1,
  user: 1,
  _id: -1,
  name: 1
});
RatingSchema.post('save',function(){
  let rating=this;
  return User.findById(rating.user)
  .exec()
  .then(function(user){
    user.akzeptanz.ratings.push(rating._id);
    return user.save();
  });
});
RatingSchema.post('save',function(){
  let rating=this;
  return Unit.findById(rating.unit)
  .exec()
  .then(function(unit){
    unit.akzeptanz.ratings.push(rating._id);
    return unit.save();
  });
});

module.exports=mongoose.model('Rating',RatingSchema);
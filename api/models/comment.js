'use strict';
const mongoose=require('mongoose');
const ObjectId=mongoose.Schema.Types.ObjectId;
const User=require('./user');
const Unit=require('./unit');

const CommentSchema=new mongoose.Schema({
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
  value: {
    type: String,
    required: true
  }
});
CommentSchema.post('save',function(){
  let comment=this;
  return User.findById(comment.user)
  .exec()
  .then(function(user){
    user.akzeptanz.comments.push(comment._id);
    return user.save();
  });
});
CommentSchema.post('save',function(){
  let comment=this;
  return Unit.findById(comment.unit)
  .exec()
  .then(function(unit){
    unit.akzeptanz.comments.push(comment._id);
    return unit.save();
  });
});

module.exports=mongoose.model('Comment',CommentSchema);
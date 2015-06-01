var mongoose,ObjectId,User,Unit,CommentSchema;
mongoose=require("mongoose");
ObjectId=mongoose.Schema.Types.ObjectId
User=require("./user");
Unit=require("./unit");

CommentSchema=new mongoose.Schema({
  unit: {
    type: ObjectId,
    required: true,
    ref: "unit"
  },
  user: {
    type: ObjectId,
    required: true,
    ref: "user"
  },
  value: {
    type: String,
    required: true
  }
});
CommentSchema.post("save",function(){
  var comment=this;
  return User.findById(comment.user)
  .execAsync()
  .then(function(user){
    user.akzeptanz.comments.push(comment._id);
    return user.saveAsync();
  });
});
CommentSchema.post("save",function(){
  var comment=this;
  return Unit.findById(comment.unit)
  .execAsync()
  .then(function(unit){
    unit.akzeptanz.comments.push(comment._id);
    return unit.saveAsync();
  });
});

module.exports=mongoose.model("Comment",CommentSchema);
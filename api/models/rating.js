var mongoose,ObjectId,User,Unit,RatingSchema,Rating;
mongoose=require("mongoose");
ObjectId=mongoose.Schema.Types.ObjectId
User=require("./user");
Unit=require("./unit");

RatingSchema=new mongoose.Schema({
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
RatingSchema.post("save",function(){
  var rating=this;
  return User.findById(rating.user)
  .execAsync()
  .then(function(user){
    user.akzeptanz.ratings.push(rating._id);
    return user.saveAsync();
  });
});
RatingSchema.post("save",function(){
  var rating=this;
  return Unit.findById(rating.unit)
  .execAsync()
  .then(function(unit){
    unit.akzeptanz.ratings.push(rating._id);
    return unit.saveAsync();
  });
});

module.exports=mongoose.model("Rating",RatingSchema);
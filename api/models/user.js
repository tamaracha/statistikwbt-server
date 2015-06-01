var mongoose,bluebird,bcrypt,validate,ObjectId,fskSchema,UserSchema,User;
mongoose=require("mongoose");
bluebird=require('bluebird');
bcrypt=bluebird.promisifyAll(require("bcrypt-nodejs"));
validate=require("../services/validate");
ObjectId=mongoose.Schema.Types.ObjectId

UserSchema=new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: validate.emailValidator,
    unique: true
  },
  password: {
    type: String,
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
      required: true
    },
    subject: {
      type: String,
      required: true
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
      ref: "rating"
    }],
    comments: [{
      type: ObjectId,
      ref: "comment"
    }]
  },
  complete: [{
    type: ObjectId,
    ref: "unit"
  }],
  views: [{
    type: ObjectId,
    ref: "view"
  }]
});
UserSchema.pre("save",function(cb){
  var user=this;
  if(!user.isModified("password")){return cb();}
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

module.exports=mongoose.model("User",UserSchema);
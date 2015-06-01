var Guess=require("../models/guess");
var $=module.exports={};

$.create=function *(){
  this.request.body.user=this.state.user._id;
  var guess=yield Guess.create(guess);
  this.assert(guess,'guess not createt',404);
  this.status=200;
};
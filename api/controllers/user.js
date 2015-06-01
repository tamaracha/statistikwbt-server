var User=require('../models/user');

exports.check=function *(){
  try{
    var users=yield User.find(this.query).lean().exec();
    if(users.length===0){this.throw(404,'no users found');}
    else{this.status=200;}
  }
  catch(e){this.throw(e);}
};

exports.create=function *(){
  try{
    var user=yield User.create(this.request.body);
    this.body=user;
  }
  catch(e){this.throw(e);}
};

exports.show=function *(){
  try{
    var user=yield User.findById(this.params.user).lean().exec();
    this.assert(user,'user not found',404);
    this.body=user;
  }
  catch(e){this.throw(e);}
};

exports.update=function *(){
  try{
    var user=yield User.findById(this.params.user).exec();
    this.assert(user,'user not found',404);
    user=yield user.patch(this.request.body);
    this.status=200;
  }
  catch(e){this.throw(e);}
};

exports.destroy=function *(){
  try{
    var user=yield User.findByIdAndRemove(this.params.user).exec();
    this.assert(user,'user not found',404);
    this.status=200;
  }
  catch(e){this.throw(e);}
};
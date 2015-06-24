'use strict';
const jwt=require('jsonwebtoken');
const config=require('config').get('jwt');
module.exports={
  sign: function(payload,options){
    return jwt.sign(payload,config.secret,options||config.options);
  },
  verify: function(token,cb){
    return jwt.verify(token,config.secret,config.options,cb);
  },
  decode: function(token){
    return jwt.decode(token);
  }
};
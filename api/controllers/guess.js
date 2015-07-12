'use strict';
const Guess = require('../models/guess');
const $ = module.exports={};

$.create = function *create(){
  this.request.body.user=this.state.user._id;
  let guess = yield Guess.create(this.request.body);
  this.assert(guess,'guess not createt',404);
  this.status=200;
};
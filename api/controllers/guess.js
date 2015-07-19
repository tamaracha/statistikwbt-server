'use strict';
const _ = require('lodash');
const $ = module.exports={};

$.create = function *create(){
  this.request.body.user = this.state.user._id;
  const guess = yield models.Guess.create(this.request.body);
  this.assert(guess,'guess not createt',404);
  this.body = guess;
};

$.createResponse = function *createResponse(){
  const guess = yield models.Guess.findById(this.params.guess);
  this.assert(guess,'no guess found',404);
  const response = guess.responses.create(this.request.body);
  guess.responses.push(response);
  yield guess.save();
  this.body = response;
};

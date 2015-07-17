'use strict';
const Test = require('../models/test');
const Guess = require('../models/guess');
const _ = require('lodash');
const jsonpatch = require('fast-json-patch');
const $ = module.exports={};

$.index=function *(){
  if(this.query.mode==='exercise'){
    let tests = yield Test.shuffle(
      this.query.conditions||null,
      this.query.projections||null,
      this.query.options||null
    );
    const ids = _.map(tests,'_id');
    let guesses = yield Guess.find({
      user: this.state.user._id
    })
    .in('test',ids)
    .lean().exec();
    this.body = _.transform(tests,function(result,t,i){
      const g = _.find(guesses,{test: t._id});
      const test = {
        item: t
      };
      if(g){
       test.guess = g;
      }
      result[i] = test;
    },[],this);
  }
  else{
    let tests=yield Test.find(
      this.query.conditions||null,
      this.query.projections||null,
      this.query.options||null
    ).lean().exec();
    this.body = tests;
  }
};

$.create=function *(){
  let test=yield Test.create(this.request.body);
  this.assert(test,'test not created',404);
  this.body=test;
};

$.show=function *(){
  let test=yield Test.findById(this.params.test);
  this.assert(test,'test not found',404);
  this.body=test;
};

/*
$.update=function *(){
  let test=yield Test.findById(this.params.test).exec();
  this.assert(test,'test not found',404);
  let patch=jsonpatch.apply(test,this.request.body);
  if(patch===true){
    yield test.save();
    this.status=200;
  }
};
*/

$.update=function *(){
  let test=yield Test.findByIdAndUpdate(this.params.test,this.request.body,{new: true});
  this.assert(test,'test not updated',404);
  this.body=test;
};

$.destroy=function *(){
  yield Test.findByIdAndRemove(this.params.test).exec();
  this.status=200;
};

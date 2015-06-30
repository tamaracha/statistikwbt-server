'use strict';
const _=require('lodash');
function requireControllers(files){
  let controllers={};
  _.forEach(files,function(f){
    controllers[f]=require('./'+f);
  });
  return controllers;
}
module.exports=requireControllers([
  'comment',
  'download',
  'guess',
  'rating',
  'subject',
  'summary',
  'test',
  'token',
  'topic',
  'unit',
  'user',
  'vega'
]);

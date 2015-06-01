_=require('lodash');
function requireControllers(files){
  var controllers={};
  _.forEach(files,function(f){
    controllers[f]=require('./'+f);
  });
  return controllers;
}
module.exports=requireControllers([
  'comment',
  'guess',
  'rating',
  'summary',
  'test',
  'token',
  'topic',
  'unit',
  'user'
]);

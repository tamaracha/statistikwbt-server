'use strict';
const _=require('lodash');
const files = [
  'comment',
  'done',
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
];
module.exports = _.transform(files,function(ctrl,f){
  ctrl[f] = require('./'+f);
},{});

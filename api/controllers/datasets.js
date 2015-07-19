'use strict';
const R = require('../services/R');
const $ = module.exports = {};

$.correlation = function *correlation(){
  const len = this.query.len || 30;
  const r = this.query.r || 0;
  const epsilon = this.query.epsilon || 0.01;
  const command = `data.frame(corgen(x=rnorm(${len}),r=${r},epsilon=${epsilon}))`;
  const dataset = R.parseEval(command);
  this.body = dataset;
};

'use strict';
const Router=require('koa-router');
const api=module.exports=new Router({prefix: '/api'});

const config=require('config').get('jwt');
const ctrl=require('./controllers');

// middleware
const body=require('koa-body')();
const jwtConfig=config.options;
jwtConfig.secret=config.secret;
const jwt=require('koa-jwt')(jwtConfig);
const log=require('./middleware/log');
api.use(body);

/* routes */
// users
api.head('/users',ctrl.user.check);
api.post('/users',ctrl.user.create);
api.get('/users/:user',jwt,ctrl.user.show);
api.patch('/users/:user',jwt,ctrl.user.update);
api.delete('/users/:user',jwt,ctrl.user.destroy);
api.get('/tokens/new',ctrl.token.new);

// units
api.get('/units',jwt,ctrl.unit.index);
api.post('/units',jwt,ctrl.unit.create);
api.get('/units/:unit',jwt,log,ctrl.unit.show);
api.patch('/units/:unit',jwt,ctrl.unit.update);
api.delete('/units/:unit',jwt,ctrl.unit.destroy);
api.get('/units/:unit/tests',ctrl.unit.tests);
api.post('/units/:unit/tests',ctrl.unit.createTest);
api.get('/units/:unit/topics',ctrl.topic.index);
api.post('/units/:unit/topics',ctrl.topic.create);
api.patch('/units/:unit/topics',ctrl.topic.edit);
api.get('/units/:unit/topics/:topic',ctrl.topic.show);
api.patch('/units/:unit/topics/:topic',ctrl.topic.update);
api.delete('/units/:unit/topics/:topic',ctrl.topic.destroy);

api.get('/units/:unit/summaries/guesses',jwt,ctrl.summary.guesses);
api.get('/units/:unit/summaries/akzeptanz',jwt,ctrl.summary.akzeptanz);

api.get('/tests',ctrl.test.index);
api.post('/tests',ctrl.test.create);

api.post('/ratings',jwt,ctrl.rating.create);
api.post('/comments',jwt,ctrl.comment.create);
api.post('/guesses',jwt,ctrl.guess.create);

api.get('/downloads',
  ctrl.download.getToken,
  jwt,
  ctrl.download.getUnits,
  ctrl.download.getMarkdown,
  ctrl.download.getFile
);
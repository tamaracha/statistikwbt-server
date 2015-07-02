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
let users=new Router();
users.head('/',ctrl.user.check);
users.post('/',ctrl.user.create);
users.get('/:user',jwt,ctrl.user.show);
users.patch('/:user',jwt,ctrl.user.update);
users.delete('/:user',jwt,ctrl.user.destroy);
api.use('/users',users.routes());
api.get('/tokens/new',ctrl.token.new);

let tests=new Router();
tests.get('/',ctrl.test.index);
tests.post('/',ctrl.test.create);
tests.get('/:test',ctrl.test.show);
tests.put('/:test',ctrl.test.update);
tests.delete('/:test',ctrl.test.destroy);
api.use('/tests',tests.routes());

// units
let units=new Router();
units.get('/',jwt,ctrl.unit.index);
units.post('/',jwt,ctrl.unit.create);
units.get('/:unit',jwt,log,ctrl.unit.show);
units.patch('/:unit',jwt,ctrl.unit.update);
units.delete('/:unit',jwt,ctrl.unit.destroy);
let topics=new Router();
topics.get('/',ctrl.topic.index);
topics.post('/',ctrl.topic.create);
topics.patch('/',ctrl.topic.edit);
topics.get('/:topic',ctrl.topic.show);
topics.patch('/:topic',ctrl.topic.update);
topics.delete('/:topic',ctrl.topic.destroy);
units.use('/:unit/topics',topics.routes());
let summaries=new Router();
summaries.get('/guesses',jwt,ctrl.summary.guesses);
summaries.get('/akzeptanz',jwt,ctrl.summary.akzeptanz);
units.use('/:unit/summaries',summaries.routes());
api.use('/units',units.routes());

let subjects=new Router();
subjects.get('/',ctrl.subject.index);
subjects.post('/',ctrl.subject.create);
subjects.get('/:subject',ctrl.subject.show);
subjects.put('/:subject',ctrl.subject.update);
subjects.delete('/:subject',ctrl.subject.destroy);
api.use('/subjects',subjects.routes());

let vega = new Router();
vega.get('/',ctrl.vega.index);
vega.post('/',ctrl.vega.create);
vega.get('/:vega',ctrl.vega.show);
vega.put('/:vega',ctrl.vega.update);
vega.delete('/:vega',ctrl.vega.destroy);
api.use('/vega',vega.routes());

const datasets = new Router();
datasets.get('/correlation',ctrl.datasets.correlation);
api.use('/data',datasets.routes());
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

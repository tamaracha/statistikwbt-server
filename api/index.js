'use strict';
const Router=require('koa-router');
const api=module.exports=new Router({prefix: '/api'});

const config=require('config').get('jwt');
global.models = require('./models');
const ctrl=require('./controllers');

// middleware
const body=require('koa-body')();
const jwtConfig=config.options;
jwtConfig.secret=config.secret;
const jwt=require('koa-jwt')(jwtConfig);
const log=require('./middleware/log');
const roles = require('./middleware/roles');

api.use(body,roles.middleware());

/* routes */
// users
let users=new Router();
users.use('/:user',jwt,roles.can('access user'));
const done = new Router();
done.get('/',ctrl.done.index);
done.post('/',ctrl.done.create);
done.get('/:done',ctrl.done.show);
done.put('/:done',ctrl.done.update);
done.delete('/:done',ctrl.done.destroy);
users.use('/:user/done',done.routes());
users.head('/',ctrl.user.check);
users.post('/',ctrl.user.create);
users.get('/:user',ctrl.user.show);
users.patch('/:user',ctrl.user.update);
users.delete('/:user',ctrl.user.destroy);
api.use('/users',users.routes());
api.get('/tokens/new',ctrl.token.new);

let tests=new Router();
tests.get('/',jwt,roles.can('access content'),ctrl.test.index);
tests.post('/',roles.can('edit content'),ctrl.test.create);
tests.get('/:test',roles.can('access content'),ctrl.test.show);
tests.put('/:test',roles.can('edit content'),ctrl.test.update);
tests.delete('/:test',roles.can('edit content'),ctrl.test.destroy);
api.use('/tests',jwt,tests.routes());

// units
let units=new Router();
units.get('/',roles.can('access content'),ctrl.unit.index);
units.post('/',roles.can('edit content'),ctrl.unit.create);
units.get('/:unit',roles.can('access content'),log,ctrl.unit.show);
units.patch('/:unit',roles.can('edit content'),ctrl.unit.update);
units.delete('/:unit',roles.can('edit content'),ctrl.unit.destroy);
let topics=new Router();
topics.get('/',roles.can('access content'),ctrl.topic.index);
topics.post('/',roles.can('edit content'),ctrl.topic.create);
topics.patch('/',roles.can('edit content'),ctrl.topic.edit);
topics.get('/:topic',roles.can('access content'),ctrl.topic.show);
topics.patch('/:topic',roles.can('edit content'),ctrl.topic.update);
topics.delete('/:topic',roles.can('edit content'),ctrl.topic.destroy);
units.use('/:unit/topics',topics.routes());
let summaries=new Router();
summaries.get('/guesses',ctrl.summary.guesses);
summaries.get('/akzeptanz',ctrl.summary.akzeptanz);
units.use('/:unit/summaries',roles.can('access content'),summaries.routes());
api.use('/units',jwt,units.routes());

let subjects=new Router();
subjects.get('/',ctrl.subject.index);
subjects.post('/',jwt,roles.can('edit content'),ctrl.subject.create);
subjects.get('/:subject',ctrl.subject.show);
subjects.put('/:subject',jwt,roles.can('edit content'),ctrl.subject.update);
subjects.delete('/:subject',jwt,roles.can('edit content'),ctrl.subject.destroy);
api.use('/subjects',subjects.routes());

let vega = new Router();
vega.get('/',roles.can('access content'),ctrl.vega.index);
vega.post('/',roles.can('edit content'),ctrl.vega.create);
vega.get('/:vega',roles.can('access content'),ctrl.vega.show);
vega.put('/:vega',roles.can('edit content'),ctrl.vega.update);
vega.delete('/:vega',roles.can('edit content'),ctrl.vega.destroy);
api.use('/vega',jwt,vega.routes());

/*
const datasets = new Router();
datasets.get('/correlation',roles.can('access content'),ctrl.datasets.correlation);
api.use('/data',jwt,datasets.routes());
*/

const guesses = new Router();
guesses.post('/',ctrl.guess.create);
guesses.post('/:guess/responses',ctrl.guess.createResponse);
api.use('/guesses',jwt,roles.can('access content'),guesses.routes());

api.post('/ratings',jwt,jwt,roles.can('access content'),ctrl.rating.create);
api.post('/comments',jwt,jwt,roles.can('access content'),ctrl.comment.create);
api.get('/downloads',
  ctrl.download.getToken,
  jwt,
  roles.can('access content'),
  ctrl.download.getUnits,
  ctrl.download.getMarkdown,
  ctrl.download.getFile
);

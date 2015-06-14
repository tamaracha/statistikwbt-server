'use strict';
var mailer=require('./services/mailer');
var Router=require('koa-router');
var api=module.exports=new Router({prefix: '/api'});

var config=require('config').get('jwt');
var ctrl=require('./controllers');

// middleware
var body=require('koa-body')();
var jwtConfig=config.options;
jwtConfig.secret=config.secret;
var jwt=require('koa-jwt')(jwtConfig);
var log=require('./middleware/log');
api.use(body);

/* routes */
// users
api.post('/mail/requestauthor',jwt,function *(){
  var mailOpts={
    from: 'statistikwbt@t-cook.de',
    to: 'tamara.cook@icloud.com',
    subject: `${this.state.user._id} möchte Autor werden.`,
    text: this.body.text
  };
  var response=yield mailer.sendMailAsync(mailOpts);
  this.body=response;
});
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

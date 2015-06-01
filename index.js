'use strict';

var koa=require('koa');
var send=require('koa-send');
var helmet=require('koa-helmet');
var api=require('./api');
//var mount=require('koa-mount');
var mongoose=require('mongoose');
var config=require('config');
var server=config.get('server');
var db=config.get('db');
var app=koa();
require('koa-qs')(app);
require('koa-onerror')(app);
app.use(require('koa-morgan').middleware('dev'))
.use(helmet.defaults())
//.use(mount('/api',require('./api')))
.use(api.routes())
.use(api.allowedMethods())
.use(require('koa-static')('../client/dist'))
.use(function *(){
  yield send(this, 'index.html',{root: '../client/dist'});
})
.listen(server.port,function(){
  console.log(`listening on ${server.host}:${server.port}`);
});
mongoose.connect(`mongodb://${config.get('db.host')}:27017/${config.get('db.database')}`);
'use strict';

var koa=require('koa');
var send=require('koa-send');
//var mount=require('koa-mount');
var helmet=require('koa-helmet');
var api=require('./api');
var mongoose=require('mongoose');
var config=require('config');
var server=config.get('server');
var db=config.get('db');
var assets=config.get('assets');
var app=koa();
require('koa-qs')(app);
require('koa-onerror')(app);
app.use(require('koa-morgan').middleware('dev'))
.use(helmet.defaults())
.use(api.routes())
.use(api.allowedMethods())
//.use(mount('/dist',require('koa-static')(assets.root)))
.use(function *(){
  yield send(this, assets.index,{root: assets.root});
})
.listen(server.port,function(){
  console.log(`listening on ${server.host}:${server.port}`);
});
mongoose.connect(`mongodb://${config.get('db.host')}:27017/${config.get('db.database')}`);
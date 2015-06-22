'use strict';
global.Promise=require('bluebird');
var koa=require('koa');
var send=require('koa-send');
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
.use(api.allowedMethods());
switch(process.env.NODE_ENV){
  case 'production':
    console.log('serving statics via nginx');
    break;
  default:
    app.use(require('koa-mount')('/dist',require('koa-static')(assets.root)))
}
app.use(function *(){
  yield send(this, assets.index,{root: assets.root});
})
.listen(server.port,server.host,function(){
  console.log(`listening on ${server.host}:${server.port}`);
});
mongoose.connect(`mongodb://${config.get('db.host')}:27017/${config.get('db.database')}`);

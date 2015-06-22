var _=require('lodash');
var fs=require('fs');
var pdcAsync=Promise.promisify(require('pdc'));
var Unit=require('../models/unit');
var template=fs.readFileSync(__dirname+'/download.md','utf8');
var compiled=_.template(template,null,{variable: 'data', imports: {_: _}});
var send=require('koa-send');
var $=module.exports={};

$.getToken=function *(next){
  if(!this.query.token){
    this.throw('no token found');
  }
  else{
    this.request.headers['authorization']='bearer '+this.query.token;
    yield next;
  }
};

$.getUnits=function *(next){
  if(_.isString(this.query.units)){
    this.query.units=[this.query.units];
  }
  if(_.isString(this.query.contents)){
    this.query.contents=[this.query.contents];
  }
  var query=Unit.find()
  .sort({position: 1});
  if(this.query.units){query.in("_id",this.query.units);}
  var units=yield query.exec();
  this.assert(units,'no units found',404);
  this.state.units=units;
  yield next;
};

$.getMarkdown=function *(next){
  var md=compiled({units: this.state.units,contents: this.query.contents});
  this.assert(md,'markdown not compiled');
  this.response.type=this.query.format;
  this.attachment('statistikwbt.'+this.query.format);
  if(this.query.format==='markdown'||this.query.format==='md'){
    this.body=md;
  }
  else{
    this.state.md=md;
    yield next;
  }
};

$.getFile=function *(){
  var fileDir=process.cwd()+'/.tmp/';
  var binary=['docx','epub'];
  if(_.contains(binary,this.query.format)){
    var fileName=`${this.state.user._id}.${this.query.format}`;
    yield pdcAsync(this.state.md,"markdown",this.query.format,["-s","-o",fileName],{cwd: fileDir});
    yield send(this,fileName,{root: fileDir});
  }
  else{
    var doc=yield pdcAsync(this.state.md,"markdown",this.query.format,["-s"],{cwd: fileDir});
    this.body=doc;
  }
};

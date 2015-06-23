var _=require('lodash');
var fs=require('fs');
var path=require('path');
var pandoc=require('../services/pandoc');
var Unit=require('../models/unit');
var template=fs.readFileSync(__dirname+'/download.md','utf8');
var compiled=_.template(template,null,{variable: 'data', imports: {_: _}});
var send=require('koa-send');
var download=require('config').get('download');
if(!path.isAbsolute(download.cwd)){
  var cwd=path.join(process.cwd(),download.cwd);
}
else{
  var cwd=download.cwd;
}
if(!path.isAbsolute(download.dest)){
  var dest=path.join(process.cwd(),download.dest);
}
else{
  var dest=download.dest;
}
var $=module.exports={};

$.getToken=function *getToken(next){
  if(!this.query.token){
    this.throw('no token found');
  }
  else{
    this.request.headers['authorization']='bearer '+this.query.token;
    yield next;
  }
};

$.getUnits=function *getUnits(next){
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

$.getMarkdown=function *getMarkdown(next){
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

$.getFile=function *getFile(){
  var binary=['docx','epub'];
  if(_.contains(binary,this.query.format)){
    var fileName=`${this.state.user._id}.${this.query.format}`;
    var filePath=path.join(dest,fileName);
    yield pandoc(this.state.md,"markdown",this.query.format,["-s","-o",filePath],{cwd});
    yield send(this,fileName,{root: dest});
  }
  else{
    var doc=yield pandoc(this.state.md,"markdown",this.query.format,["-s"],{cwd});
    this.body=doc;
  }
};

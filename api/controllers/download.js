'use strict';
const _=require('lodash');
const fs=require('fs');
const path=require('path');
const pandoc=require('../services/pandoc');
const Unit=require('../models/unit');
const template=fs.readFileSync(__dirname+'/download.md','utf8');
const compiled=_.template(template,null,{variable: 'data', imports: {_: _}});
const send=require('koa-send');
const download=require('config').get('download');
let cwd=download.cwd;
let dest=download.dest;
if(!path.isAbsolute(download.cwd)){
  cwd=path.join(process.cwd(),download.cwd);
}
if(!path.isAbsolute(download.dest)){
  dest=path.join(process.cwd(),download.dest);
}
const binary=['docx','epub'];
const $=module.exports={};

$.getToken=function *getToken(next){
  if(!this.query.token){
    this.throw('no token found');
  }
  else{
    this.request.headers.authorization='bearer '+this.query.token;
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
  let query=Unit.find()
  .sort({position: 1});
  if(this.query.units){query.in('_id',this.query.units);}
  let units=yield query.exec();
  this.assert(units,'no units found',404);
  this.state.units=units;
  yield next;
};

$.getMarkdown=function *getMarkdown(next){
  let md=compiled({units: this.state.units,contents: this.query.contents});
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
  if(_.contains(binary,this.query.format)){
    let fileName=`${this.state.user._id}.${this.query.format}`;
    let filePath=path.join(dest,fileName);
    yield pandoc(this.state.md,'markdown',this.query.format,['-s','-o',filePath],{cwd: cwd});
    yield send(this,fileName,{root: dest});
  }
  else{
    let doc=yield pandoc(this.state.md,'markdown',this.query.format,['-s'],{cwd: cwd});
    this.body=doc;
  }
};
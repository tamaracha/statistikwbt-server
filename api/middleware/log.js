'use strict';
const View=require('../models/view');

module.exports=function *log(next){
  let data={
    unit: this.params.unit,
    user: this.state.user._id
  };
  if(this.params.topic){data.topic=this.params.topic;}
  yield next;
  yield View.create(data);
};
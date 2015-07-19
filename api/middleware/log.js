'use strict';
module.exports=function *log(next){
  let data={
    unit: this.params.unit,
    user: this.state.user._id
  };
  if(this.params.topic){data.topic=this.params.topic;}
  yield next;
  yield models.View.create(data);
};
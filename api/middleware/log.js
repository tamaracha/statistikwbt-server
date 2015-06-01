'use strict';
var View=require('../models/view');

function*log(next){
  var data={
    unit: this.params.unit,
    user: this.state.user._id
  };
  if(this.params.topic){data.topic=this.params.topic;}
  yield next;
  var view=yield View.create(data);
  view ? console.log('view createt') : console.log('view not created');
}
module.exports=log;
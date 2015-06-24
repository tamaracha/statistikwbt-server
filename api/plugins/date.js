'use strict';
const field={
  type: Date,
  default: Date.now
};
function date(schema){
  schema.add({
    'created_at': field,
    updated_at: field
  });
  schema.pre('save',function(next){
    let now=new Date();
    this.updated_at=now;
    if(!this.created_at){this.created_at=now;}
    next();
  });
}
module.exports=date;
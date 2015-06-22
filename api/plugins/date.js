
var field={
  type: Date,
  default: Date.now
};
module.exports=function date(schema,options){
  schema.add({
    'created_at': field,
    updated_at: field
  });
  schema.pre('save',function(next){
    var now=new Date();
    this.updated_at=now;
    if(!this.created_at){this.created_at=now;}
    next();
  });
}

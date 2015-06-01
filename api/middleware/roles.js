var connectRoles=require('connect-roles');
var role=new connectRoles();

role.use(function(req){
  if(!req.user){return false;}
  if(req.user.role==='admin'){
    return true;
  }
});

role.use('edit content',function(req){
  if(req.user.role='author'){
    return true;
  }
});

module.exports=role;
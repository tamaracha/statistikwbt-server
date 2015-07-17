const Roles = require('koa-roles');
const roles = module.exports = new Roles();
roles.use('access public',function *(action){
  return true;
});
roles.use(function *(action){
  if(this.state.user && this.state.user.role === 'admin'){
    return true;
  }
});
roles.use('access content',function *(action){
  if(!this.state.user){
    return false;
  }
  switch(this.state.user.role){
    case 'user': return true;
    case 'author': return true;
    default: return false;
  }
});
roles.use('edit content',function *(action){
  switch(this.state.user.role){
    case 'author': return true;
    default: return false;
  }
});
roles.use('access user',function *(action){
  return this.state.user._id === this.params.user;
});
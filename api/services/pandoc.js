var spawn=require('child_process').spawn;

module.exports=function pandoc(input,from,to,args,opts){
  if(typeof to==='undefined'){var to='rtf';}
  if(typeof from==='undefined'){var from='markdown';}
  var defaultArgs=['-f',from,'-t',to];
  if(args){
    args=defaultArgs.concat(args);
  }
  else if(typeof args==='undefined'){
    args=defaultArgs;
  }
  return new Promise(function(resolve,reject){
    if(opts){
      var child=spawn('pandoc',args,opts);
    }
    else{
      var child=spawn('pandoc',args);
    }
    child.stdout.on('data',function(data){
      resolve(data.toString('utf8'));
    });
    child.stderr.on('data',function(e){
      console.error(e.toString('utf8'));
    });
    child.on('error',reject);
    child.on('close',function(code){
      if(code&&code!==0){
        reject('exited with code '+code);
      }
      else{resolve('closed');}
    });
    child.stdin.end(input,'utf8');
  });
}
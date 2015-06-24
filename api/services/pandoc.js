'use strict';
const spawn=require('child_process').spawn;

function pandoc(input,from,to,args,opts){
  if(!to){to='rtf';}
  if(!from){from='markdown';}
  let defaultArgs=['-f',from,'-t',to];
  if(args){
    args=defaultArgs.concat(args);
  }
  else if(!args){
    args=defaultArgs;
  }
  return new Promise(function(resolve,reject){
    let child;
    if(opts){
      child=spawn('pandoc',args,opts);
    }
    else{
      child=spawn('pandoc',args);
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
module.exports=pandoc;
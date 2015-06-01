var fs,glob,yaml,Vega;
fs=require("fs");
Promise.promisifyAll(fs);
glob=Promise.promisify(require("glob"));
yaml=require("js-yaml");
Promise.promisifyAll(yaml);
Vega=require("./models/vega");

glob("vega/*.yml")
.map(function(filename){
  return fs.readFileAsync(filename,"utf8")
  .then(yaml.load)
  .then(function(vega){
    return Vega.updateAsync({name: vega.name},vega,{upsert: true});
  })
  .catch(function(e){
    console.log(e.message);
  });
})
.then(function(){
  console.log("vega specs eingelesen");
},function(e){
  console.log(e.message);
});
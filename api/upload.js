var fs,glob,yaml,Unit;
fs=require("fs");
Promise.promisifyAll(fs);
glob=Promise.promisify(require("glob"));
yaml=require("js-yaml");
Promise.promisifyAll(yaml);
Unit=require("./models/unit");

glob("./content/*.yml")
.map(function(filename){
  return fs.readFileAsync(filename,"utf8")
  .then(yaml.load)
  .then(function(doc){
    if(doc.tests){
      var tests=_.groupBy(doc.tests,function(test){
        if(!test.type||test.type==="single"){return "singleChoices";}
        if(test.type==="multiple"){return "multipleChoices";}
        if(test.type==="fill"||test.type==="reflect"){return "inputs";}
      });
      doc.tests=tests;
    }
    return Unit.updateAsync({_id: doc._id},doc,{upsert: true});
  })
  .catch(function(e){
    console.error(e);
  });
})
.then(function(){
  console.log("yaml-Dateien eingelesen");
},function(e){
  console.error(e.stack);
});
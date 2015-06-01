var fs,yaml,Subject;
fs=require("fs");
Promise.promisifyAll(fs);
yaml=require("js-yaml");
Promise.promisifyAll(yaml);
Subject=require("./models/subject");

fs.readFileAsync("./api/studiengänge.yml","utf8")
.then(yaml.load)
.then(function(groups){
  var subjects=[];
  _.forEach(groups,function(group,key){
    _.forEach(group,function(subject){
      subjects.push({
        group: key,
        name: subject
      });
    });
  });
  return Subject.createAsync(subjects);
})
.then(function(subjects){
  console.log("Fächer eingelesen");
})
.catch(function(e){
  console.error(e);
});
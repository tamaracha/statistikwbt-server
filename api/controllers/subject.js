var Subject,e;
Subject=require("./models/subject");
e=require("./errors");

exports.find=function(req,res){
  Subject.find({name: new RegExp(req.query.search,"i")})
  .execAsync()
  .then(function(subjects){
    return res.json(subjects);
  })
  .catch(e.onError(res));
};
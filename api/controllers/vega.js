var Vega,e;
Vega=require("./models/vega");
e=require("./errors");

exports.findOne=function(req,res){
  Vega.findOne({name: req.params.spec})
  .lean()
  .execAsync()
  .then(function(vega){
    if(!vega){throw e.notFound("vega spec not found");}
    return res.json(vega);
  })
  .catch(e.onError(res));
};
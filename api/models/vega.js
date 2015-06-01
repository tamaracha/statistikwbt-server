var mongoose,VegaSchema,Vega;
mongoose=require("mongoose");
VegaSchema=new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  data: [],
  scales: [],
  axes: [],
  legends: [],
  marks: []
});

Vega=mongoose.model("Vega",VegaSchema);
Promise.promisifyAll(Vega.prototype);
module.exports=Vega;
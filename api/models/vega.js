const mongoose=require("mongoose");
const VegaSchema=new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  spec: {}
});
module.exports=mongoose.model("Vega",VegaSchema);

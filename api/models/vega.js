const mongoose=require("mongoose");
const VegaSchema=new mongoose.Schema({
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

module.exports=mongoose.model("Vega",VegaSchema);
var mongoose,ExtraSchema,Extra;
mongoose=require("mongoose");

ExtraSchema=new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: String,
  body: {
    type: String,
    required: true
  }
});

Extra=mongoose.model("Extra",ExtraSchema);
module.exports=Extra;
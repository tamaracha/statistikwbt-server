var mongoose,ExampleSchema,Example;
mongoose=require("mongoose");

ExampleSchema=new mongoose.Schema({
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

Example=mongoose.model("Example",ExampleSchema);
module.exports=Example;
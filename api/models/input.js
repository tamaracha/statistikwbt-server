var mongoose,InputSchema,Input;
mongoose=require("mongoose");

InputSchema=new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: "fill"
  },
  correct: {
    type: String,
    required: true
  },
  feedback: {
    right: {
      type: String,
      required: true
    },
    wrong: {
      type: String,
      required: true
    }
  }
});

Input=mongoose.model("Input",InputSchema);
module.exports=Input;
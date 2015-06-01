var mongoose,SingleChoiceSchema,SingleChoice;
mongoose=require("mongoose");

SingleChoiceSchema=new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  choices: [{
    text: {
      type: String,
      required: true
    },
    correct: {
      type: Boolean,
      default: false
    },
    feedback: String
  }]
});

SingleChoice=mongoose.model("SingleChoice",SingleChoiceSchema);
module.exports=SingleChoice;
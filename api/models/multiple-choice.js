var mongoose,MultipleChoiceSchema,MultipleChoice;
mongoose=require("mongoose");

MultipleChoiceSchema=new mongoose.Schema({
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
    feedback: {
      correct: String,
      incorrect: String
    }
  }]
});

MultipleChoice=mongoose.model("MultipleChoice",MultipleChoiceSchema);
module.exports=MultipleChoice;
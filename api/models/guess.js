var mongoose,ObjectId,GuessSchema;
mongoose=require("mongoose");
ObjectId=mongoose.Schema.Types.ObjectId;

GuessSchema=new mongoose.Schema({
  unit: {
    type: ObjectId,
    required: true,
    ref: "unit"
  },
  user: {
    type: ObjectId,
    required: true,
    ref: "user"
  },
  item: {
    type: ObjectId,
    required: true
  },
  response: {
    single: ObjectId,
    multiple: [ObjectId],
    input: String
  }
});

module.exports=mongoose.model("Guess",GuessSchema);
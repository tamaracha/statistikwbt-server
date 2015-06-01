var mongoose,TopicSchema,Topic;
mongoose=require("mongoose");

TopicSchema=new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  subtitle: String,
  body: {
    type: String,
    required: true
  },
  examples: [require("./example").schema],
  extras: [require("./extra").schema]
});

Topic=mongoose.model("Topic",TopicSchema);
module.exports=Topic;
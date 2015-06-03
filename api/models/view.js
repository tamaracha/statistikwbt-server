'use strict';
var mongoose=require("mongoose");
var ObjectId=mongoose.Schema.Types.ObjectId

var ViewSchema=new mongoose.Schema({
  unit: {
    type: ObjectId,
    required: true,
    ref: "unit"
  },
  topic: {
    type: ObjectId,
    ref: "unit.topic"
  },
  user: {
    type: ObjectId,
    ref: "user",
    required: true
  }
});

module.exports=mongoose.model("View",ViewSchema);
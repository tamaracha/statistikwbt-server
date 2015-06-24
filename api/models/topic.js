'use strict';
const mongoose=require('mongoose');

const TopicSchema=new mongoose.Schema({
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
  examples: [require('./example').schema],
  extras: [require('./extra').schema]
});

module.exports=mongoose.model('Topic',TopicSchema);
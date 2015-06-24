'use strict';
const mongoose=require('mongoose');

const ExampleSchema=new mongoose.Schema({
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

module.exports=mongoose.model('Example',ExampleSchema);
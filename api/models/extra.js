'use strict';
const mongoose=require('mongoose');

const ExtraSchema=new mongoose.Schema({
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

module.exports=mongoose.model('Extra',ExtraSchema);
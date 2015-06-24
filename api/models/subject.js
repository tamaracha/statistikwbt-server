'use strict';
const mongoose=require('mongoose');
const SubjectSchema=mongoose.Schema({
  group: {
    required: true,
    type: String
  },
  name: {
    required: true,
    type: String
  }
});

module.exports=mongoose.model('Subject',SubjectSchema);
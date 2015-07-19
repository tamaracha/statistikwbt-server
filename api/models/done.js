'use strict';
const mongoose = require('mongoose');
const ObjectId=mongoose.Schema.Types.ObjectId;
module.exports = new mongoose.Schema({
  unit: {
    type: ObjectId,
    required: true,
    ref: 'units'
  }
});

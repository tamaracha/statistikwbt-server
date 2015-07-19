'use strict';
const mongoose = require('mongoose');
module.exports = new mongoose.Schema({
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
});

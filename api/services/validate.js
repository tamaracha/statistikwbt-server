'use strict';
const $=require('mongoose-validator');
const _=require('lodash');

module.exports={
  passwordValidator: $({
    validator: 'isLength',
    arguments: [8],
    message: 'password must have at least eight characters'
  }),
  emailValidator: $({
    validator: 'isEmail',
    message: 'not a valid email address'
  }),
  notEmpty: $({
    validator: function(options){
      return options.length>0;
    },
    message: 'must contain at least one option'
  },{
    validator: function(options){
      return _.any(options,'correct');
    },
    message: 'at least one option must be correct'
  })
};
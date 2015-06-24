'use strict';
const bluebird=require('bluebird');
const mailer=require('nodemailer');
const mailConfig=require('config').get('email');
const transport=mailConfig ? mailer.createTransport(mailConfig) : mailer.createTransport();
bluebird.promisifyAll(transport);
module.exports=transport;

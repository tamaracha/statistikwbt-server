var Promise=require('bluebird');
var mailer=require('nodemailer');
var mailConfig=require('config').get('email');
var transport=mailConfig ? mailer.createTransport(mailConfig) : mailer.createTransport();
Promise.promisifyAll(transport);
module.exports=transport;

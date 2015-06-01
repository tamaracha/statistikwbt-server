var jwt=require("jsonwebtoken");
module.exports={
	sign: function(payload,options){
		return jwt.sign(payload,sails.config.token.secret,options||sails.config.token.options);
	},
	verify: function(token,cb){
		return jwt.verify(token,sails.config.token.secret,sails.config.token.options,cb);
	},
	decode: function(token){
		return jwt.decode(token);
	}
};
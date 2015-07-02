const rstats = require('rstats');
const R = new rstats.session();
R.parseEvalQ('library("ecodist")');
module.exports = R;

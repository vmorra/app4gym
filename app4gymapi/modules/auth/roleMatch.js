var config = require('../../config/passport');

var checkApiRoleHeader = function(req,res,next){
  var token = req.get(config.apiRoleHeader);
  if(token == req.user.role) next();
  else{
    res.status(401).json({code: 5000, msg: 'API Role Mismatch'});
  }
}

module.exports.checkApiRoleHeader = checkApiRoleHeader;

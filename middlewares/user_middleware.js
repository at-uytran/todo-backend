var User = require('../models/user.js');
var _ = require('lodash');
var {resHelper} = require('../helpers/response_helper');

class UserMiddleware {
  static async validate_register(req, res, next) {
    let {email} = req.body;
    let user = await User.findOne({email: email});
    if (_.isNil(user)){
      next();
    } else {
      return resHelper(res, 400, {message: 'Email exist'}, 'Email exist');
    }
  }
}

module.exports = UserMiddleware;

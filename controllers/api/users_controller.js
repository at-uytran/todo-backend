var User = require('../../models/user.js');
var {resHelper} = require('../../helpers/response_helper');
var _ = require('lodash');

class UserController {
  static async register(req, res, next) {
    var userName = req.body.userName;
    var password = req.body.password;
    var userJson = {
      userName: userName,
      password: password
    }
    var hash = await User.generatePasswordHash(userJson);
    if (hash) {
      var user = await User.create({name: userJson.userName, passwordHash: hash});
      if (!_.isNil(user)) resHelper(res, 200, {token: user.generateJWTToken(), user: user.jsonData(), message: 'Create user success'}, 'Create user success');
    } else {
      resHelper(res, 400, {message: 'Create user failed'}, 'Create user failed');
    }
  }
}

module.exports = UserController;

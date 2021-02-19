var User = require('../../models/user.js');
var {resHelper} = require('../../helpers/response_helper');
var _ = require('lodash');

class UserController {
  static async register(req, res, next) {
    console.log(req.params)
    var userName = req.body.userName;
    var password = req.body.password;
    var userJson = {
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password
    }
    var hash = await User.generatePasswordHash(userJson);
    if (hash) {
      var user = await User.create({userName: userJson.userName, email: userJson.email, passwordHash: hash});
      if (!_.isNil(user)) resHelper(res, 200, {token: user.generateJWTToken(), user: user.jsonData(), message: 'Create user success'}, 'Create user success');
    } else {
      resHelper(res, 400, {message: 'Create user failed'}, 'Create user failed');
    }
  }
}

module.exports = UserController;

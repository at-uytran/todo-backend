require('dotenv').config();
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var {resHelper} = require('../../helpers/response_helper');
var User = require('../../models/user');

class AuthController {
  static async sign_in(req, res, next) {
    var userName = req.body.userName;
    var password = req.body.password;
    if (_.isNil(userName) || _.isNil(password)) return resHelper(res, 400, {}, 'Invalid parameter');
    var user = await User.get({name: userName});
    if (_.isNil(user)) return resHelper(res, 404, null, 'Not found');
    var isAuth = await user.verifyPassword(password);
    if (isAuth) {
      var token = jwt.sign({userName: userName, userId: user._id}, process.env.JWT_SECRET);
      return resHelper(res, 200, {accessToken: token}, 'Sign in success');
    } else {
      return resHelper(res, 400, {error: 'Invalid usename or password'}, 'Sign in failed');
    }
  }

  static async authenticate_user(req, res, next) {
    var authHeader = req.headers['authorizationtoken'];
    if (authHeader && authHeader.split(' ')[0] !== 'Bearer') resHelper(res, 401, {error: 'Unauthorized'}, 'Unauthorized');
    if (_.isNil(authHeader)) return resHelper(res, 401, {error: 'Unauthorized'}, 'Unauthorized');
    var token = authHeader.split(' ')[1];
    var decodedToken = null;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      var currentUser = await User.get({name: decodedToken.userName});
      if (_.isNil(currentUser)) return resHelper(res, 400, {error: 'bad request'}, 'Bad request');
      res.locals.currentUser = currentUser;
    } catch (error) {
      return resHelper(res, 400, {error: 'bad request'}, 'Bad request');
    }
    if (_.isNil(decodedToken)) return resHelper(res, 400, {error: 'bad request'}, 'Bad request');
    next();
  }
}

module.exports = AuthController;

require('dotenv').config();
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var {resHelper} = require('../helpers/response_helper');
var User = require('../models/user');

class AuthMiddleware {
  static async authenticate_user (req, res, next) {
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

module.exports = AuthMiddleware;

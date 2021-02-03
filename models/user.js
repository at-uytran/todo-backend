var mongoose = require('mongoose');
var userSchema = require('./schemas/user_schema');
var _ = require('lodash');
var jwt = require('jsonwebtoken');

const { Model } = mongoose;
const bcrypt = require('bcrypt');
const saltRounds = 10;

class User extends Model {
  constructor(user) {
    super(user);
  }

  static create(data, fcallback) {
    var user = new this(data);
    user.save();
    return user;
  }

  static get(query) {
    return this.findOne(query);
  }

  static findByName(query, fcallback) {
    return this.find(query, fcallback);
  }

  static update(query, updateData, fcallback) {
    this.findOneAndUpdate(query, {$set: updateData}, {new: true}, fcallback);
  }

  static delete(query, fcallback) {
    this.findOneAndDelete(query, fcallback);
  }

  static generatePasswordHash(query, cb) {
    let password = query.password.toString();
    return bcrypt.hash(password, saltRounds);
  }

  verifyPassword(passwordParam, cb) {
    if (_.isNil(passwordParam)) return null;
    passwordParam = passwordParam.toString();
    return bcrypt.compare(passwordParam, this.passwordHash);
  }

  generateJWTToken() {
    return jwt.sign({userName: this.userName, userId: this._id}, process.env.JWT_SECRET);
  }

  jsonData() {
    var data = {
      _id: this._id,
      name: this.name || null,
      email: this.email || null,
      birthday: this.birthday || null,
      address: this.address || null,
    }
    return(data);
  }
}

var userModel = mongoose.model(User, userSchema, 'User');
module.exports = userModel;

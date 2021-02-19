var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {type: String},
  email: {type: String},
  passwordHash: {type: String},
  birthday: {type: Date},
  address: {type: String},
}, {
  timestamps: true
});

module.exports = userSchema;

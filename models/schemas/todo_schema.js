var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const todoSchema = new Schema({
  todoName: {type: String},
  description: {type: String},
  doneAt: {type: Date},
  isDone: {type: String},
  createdBy: {type: String},
}, {
  timestamps: true
});

module.exports = todoSchema;

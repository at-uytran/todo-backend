var mongoose = require('mongoose');
var todoSchema = require('./schemas/todo_schema');
const { Model } = mongoose;

class Todo extends Model {
  constructor(todo) {
    super(todo);
  }

  getName() {
    return this.name;
  }

  static create(data, fcallback) {
    var todo = new this(data);
    todo.save(fcallback);
  }

  static getOne(query, fcallback) {
    return this.findOne(query);
  }

  static get(query, fcallback) {
    return this.find(query, fcallback);
  }

  static findByName(query, fcallback) {
    return this.find(query, fcallback);
  }

  static update(query, updateData, fcallback) {
    return this.findOneAndUpdate(query, {$set: updateData}, {new: true}, fcallback);
  }

  static delete(query, fcallback) {
    return this.findOneAndDelete(query, fcallback);
  }

  update(data) {
    this.overwrite(data);
    this.save();
  }

  jsonData() {
    let data = {
      _id: this._id,
      todoName: this.todoName || null,
      isDone: this.isDone || null,
      createdBy: this.createdBy || null,
      doneAt: this.doneAt || null,
    }
    return data;
  }
}

var todoModel = mongoose.model(Todo, todoSchema, 'Todo');
module.exports = todoModel;

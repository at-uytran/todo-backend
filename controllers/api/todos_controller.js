var Todo = require('../../models/todo');
var User = require('../../models/user');
var _ = require('lodash');
var {resHelper} = require('../../helpers/response_helper');

class TodosController {
  static index(req, res, next) {
    Todo.get({}, function(err, todos) {
      if (err) return res.json({error: err});
      return res.json({data: todos, message: 'Load data success'});
    })
  }

  static create(req, res, next) {
    var todoName = req.body.todoName;
    Todo.create({todoName: todoName, createdBy: res.locals.currentUser._id}, function(err, todo) {
      if (todo) {
        res.json({data: todo.jsonData(), message: 'Create success'})
      } else {
        res.json({data: null, messsage: 'Create failed'})
      }
    });
  }

  static async update(req, res, next) {
    var todo = await Todo.getOne({_id: req.params.id});
    var updateParams = req.parameters.permit(['todoName', 'isDone', '_id']).value();
    todo.update(updateParams);
    if (_.isNil(todo)) return resHelper(res, 404, null, 'Todo not found');
    return resHelper(res, 200, todo.jsonData(), 'Update todo success');
  }
}

module.exports = TodosController;

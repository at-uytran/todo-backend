var TopPagesController = require('../controllers/api/top_pages_controller.js');
var AuthController = require('../controllers/api/auth_controller.js');
var UsersController = require('../controllers/api/users_controller.js');
var TodosController = require('../controllers/api/todos_controller.js');

module.exports = function(router) {
  router.get('/top_pages', AuthController.authenticate_user, TopPagesController.index);
  router.post('/register', UsersController.register);
  router.post('/auth/sign_in', AuthController.sign_in);
  router.post('/auth/authenticate_user', AuthController.authenticate_user);
  router.get('/todos', AuthController.authenticate_user, TodosController.index);
  router.post('/todos', AuthController.authenticate_user, TodosController.create);
  router.put('/todo/:id', AuthController.authenticate_user, TodosController.update);
}

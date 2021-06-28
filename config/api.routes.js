// Middlewares
var AuthMiddleware = require('../middlewares/auth_middleware.js');
var UserMiddleware = require('../middlewares/user_middleware.js');

// Controllers
var TopPagesController = require('../controllers/api/top_pages_controller.js');
var AuthController = require('../controllers/api/auth_controller.js');
var UsersController = require('../controllers/api/users_controller.js');
var TodosController = require('../controllers/api/todos_controller.js');

module.exports = function(router) {
  router.get('/top_pages', AuthMiddleware.authenticate_user, TopPagesController.index);
  router.post('/register', UserMiddleware.validate_register, UsersController.register);
  router.post('/auth/sign_in', AuthController.sign_in);
  router.post('/auth/authenticate_user', AuthMiddleware.authenticate_user);
  router.get('/auth/user', AuthMiddleware.authenticate_user, AuthController.user);
  router.get('/todos', AuthMiddleware.authenticate_user, TodosController.index);
  router.post('/todos', AuthMiddleware.authenticate_user, TodosController.create);
  router.put('/todo/:id', AuthMiddleware.authenticate_user, TodosController.update);
}

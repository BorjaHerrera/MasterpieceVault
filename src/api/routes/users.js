const { isAuth, isUser, isAdmin } = require('../../middlewares/Auth');
const {
  register,
  login,
  deleteUser,
  addPainting,
  deletePainting,
  getUserFavorites
} = require('../controllers/users');

const userRoutes = require('express').Router();

userRoutes.post('/register', register);
userRoutes.post('/login', login);
userRoutes.get('/:id/favorites', [isAuth, isUser], getUserFavorites);
userRoutes.post('/:id/favorites', [isAuth], addPainting);
userRoutes.delete('/:id/favorites', [isAuth, isUser], deletePainting);
userRoutes.delete('/:id', [isAuth, isUser, isAdmin], deleteUser);

module.exports = userRoutes;

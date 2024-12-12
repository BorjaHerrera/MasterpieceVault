const bcrypt = require('bcrypt');

const { generateSign } = require('../../confi/jwt');
const Painting = require('../models/paintings');
const User = require('../models/users');

const register = async (req, res, next) => {
  try {
    const newUser = new User(req.body);

    const duplicatedUser = await User.findOne({ email: req.body.email });

    if (duplicatedUser) {
      return res.status(400).json('Este usuario ya existe');
    }

    newUser.role = 'user';

    const user = await newUser.save();

    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json('Error durante el registro de usuario');
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json('Usuario o contraseña incorrectos');
    }

    if (bcrypt.compareSync(password, user.password)) {
      const token = generateSign(user._id);

      return res.status(200).json({ user, token });
    } else {
      return res.status(400).json('Usuario o contraseña incorrectos');
    }
  } catch (error) {
    console.log(error);

    return res.status(400).json('Usuario o contraseña incorrectos.');
  }
};

const getUserFavorites = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate({
      path: 'favorites',
      populate: {
        path: 'artist'
      }
    });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json('error');
  }
};

const addPainting = async (req, res, next) => {
  try {
    const { favorites } = req.body;
    const paintingId = favorites;
    const painting = await Painting.findById(paintingId);

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { favorites: paintingId } },
      { new: true }
    ).populate('favorites');

    return res.status(201).json({
      message: `El cuadro se ha incluido en tu lista de favoritos.`,
      user: user,
      painting: painting
    });
  } catch (error) {
    return res.status(400).json('Error en la solicitud addPainting');
  }
};

const deletePainting = async (req, res, next) => {
  try {
    const { paintingId } = req.body;
    const painting = await Painting.findById(paintingId);

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { favorites: paintingId } },
      { new: true }
    ).populate('favorites');

    return res.status(200).json({
      message: `El cuadro ha sido eliminado.`,
      user: user,
      painting: painting
    });
  } catch (error) {
    return res.status(400).json('Error en la solicitud deletePainting');
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userDeleted = await User.findByIdAndDelete(id);
    return res.status(200).json({ mensaje: 'Usuario eliminado:', userDeleted });
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  register,
  login,
  getUserFavorites,
  addPainting,
  deletePainting,
  deleteUser
};

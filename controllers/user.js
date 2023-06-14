const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  IncorrectError,
  NotFoundError,
  UnauthorizedError,
  Conflict,
} = require('../errors');

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, 'super-strong-secret-key', { expiresIn: '7d' })
      });
    })
    .catch((err) => {
      throw new UnauthorizedError('Неправильные пользователь или пароль')
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new IncorrectError('Переданы некорректные данные');
      }
      if (err.name === 'DocumentNotFoundError') {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      }
      next(err);
    });
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new IncorrectError('Переданы некорректные данные');
      }
      if (err.name === 'DocumentNotFoundError') {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      }
      next(err);
    });
};

module.exports.getUserInfo = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      }
      return res.send({ data: user })
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new IncorrectError('Переданы некорректные данные');
      }
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.code === 11000) {
        throw new Conflict('Такой пользователь уже существует');
      }
      if (err.name === 'ValidationError') {
        throw new IncorrectError('Переданы некорректные данные при создании пользователя.');
      }
      next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        throw new IncorrectError('Переданы некорректные данные при обновлении профиля.');
      }
      if (err.name === 'DocumentNotFoundError') {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      }
      next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        throw new IncorrectError('Переданы некорректные данные при обновлении профиля.');
      }
      if (err.name === 'DocumentNotFoundError') {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      }
      next(err);
    });
};

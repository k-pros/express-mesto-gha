const User = require('../models/user');
const {
  ERROR_CODE_INCORRECT,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_DEFAULT,
} = require('../utils/errors');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(ERROR_CODE_DEFAULT).send({ message: 'Ошибка сервера' }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_INCORRECT).send({ message: 'Переданы некорректные данные' });
        return;
      }
      if (err.name === 'DocumentNotFoundError') {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден.' });
        return;
      }

      res.status(ERROR_CODE_DEFAULT).send({ message: 'Ошибка сервера' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_INCORRECT).send({ message: 'Переданы некорректные данные при создании пользователя.' });
        return;
      }
      res.status(ERROR_CODE_DEFAULT).send({ message: 'Ошибка сервера' });
    });
};

module.exports.updateUser = (req, res) => {
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
        res.status(ERROR_CODE_INCORRECT).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
        return;
      }
      if (err.name === 'DocumentNotFoundError') {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден.' });
        return;
      }
      res.status(ERROR_CODE_DEFAULT).send({ message: 'Ошибка сервера' });
    });
};

module.exports.updateAvatar = (req, res) => {
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
        res.status(ERROR_CODE_INCORRECT).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
        return;
      }
      if (err.name === 'DocumentNotFoundError') {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден.' });
        return;
      }
      res.status(ERROR_CODE_DEFAULT).send({ message: 'Ошибка сервера' });
    });
};

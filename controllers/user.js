const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: 'Server Error' }));
};

module.exports.getUserById = (req, res) => {
  const { id } = req.params;
  const user = User.find((item) => item._id = id);
  if (!user) {
    return res.status(404).send({ message: 'User is not found'});
  } else {
      res.send(user);
  }
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: 'Server Error' }));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: 'Server Error' }));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: 'Server Error' }));
};

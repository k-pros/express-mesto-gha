const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: 'Server Error'}));
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
  console.log(req.body);
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: 'Server Error' }));
};
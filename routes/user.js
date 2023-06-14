const router = require('express').Router();
const {
  getUsers, getUserById, updateUser, updateAvatar, getUserInfo,
} = require('../controllers/user');
const { validateUserId, validateUpdateUser, validateAvatar } = require('../middlewares/validation');

router.get('/users', getUsers);
router.get('/users/me', getUserInfo);
router.get('/users/:userId', validateUserId, getUserById);
router.patch('/users/me', validateUpdateUser, updateUser);
router.patch('/users/me/avatar', validateAvatar, updateAvatar);

module.exports = router;

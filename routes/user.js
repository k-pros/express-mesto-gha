const router = require('express').Router();
const {
  getUsers, getUserById, updateUser, updateAvatar, getUserInfo,
} = require('../controllers/user');
const { validateUserId, validateUpdateUser, validateAvatar } = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:userId', validateUserId, getUserById);
router.patch('/me', validateUpdateUser, updateUser);
router.patch('/me/avatar', validateAvatar, updateAvatar);

module.exports = router;

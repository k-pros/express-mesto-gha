const router = require('express').Router();
const userRouter = require('./user');
const cardRouter = require('./card');
const { ERROR_CODE_NOT_FOUND } = require('../utils/errors');

router.use(userRouter);
router.use(cardRouter);
router.use('/*', (req, res) => {
  res.status(ERROR_CODE_NOT_FOUND).send({ message: '404: Not Found' });
});

module.exports = router;

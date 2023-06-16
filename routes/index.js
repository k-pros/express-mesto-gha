const router = require('express').Router();
const userRouter = require('./user');
const cardRouter = require('./card');
const { NotFoundError } = require('../errors');

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('/*', (req, res, next) => {
  next(new NotFoundError('404: Not Found'));
});

module.exports = router;

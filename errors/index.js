const ForbiddenError = require('./forbidden-err');
const IncorrectError = require('./incorrect-err');
const NotFoundError = require('./not-found-err');
const UnauthorizedError = require('./unauthorized-err');
const Conflict = require('./conflict-err');

module.exports = {
  ForbiddenError,
  IncorrectError,
  NotFoundError,
  UnauthorizedError,
  Conflict,
};

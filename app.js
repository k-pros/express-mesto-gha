const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');
const { portNumber } = require('./utils/config');
const { login, createUser } = require('./controllers/user');
const { PORT = portNumber } = process.env;
const { auth } = require('./middlewares/auth');
const { errors } = require('celebrate');
const { validateCreateUser, validateLogin } = require('./middlewares/validation');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());

app.post('/signin', validateLogin, login);
app.post('/signup', validateCreateUser, createUser);

app.use(auth);
app.use(router);

app.use(errors()); // обработчик ошибок celebrate

// централизованный обработчик
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

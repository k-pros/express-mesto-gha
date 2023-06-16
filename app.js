const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes');
const { portNumber } = require('./utils/config');
const { login, createUser } = require('./controllers/user');
const { auth } = require('./middlewares/auth');
const { validateCreateUser, validateLogin } = require('./middlewares/validation');
const { handleErrors } = require('./middlewares/handleErrors');

const { PORT = portNumber } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());

app.post('/signin', validateLogin, login);
app.post('/signup', validateCreateUser, createUser);

app.use(auth);
app.use(router);

app.use(errors()); // обработчик ошибок celebrate
app.use(handleErrors); // централизованный обработчик ошибок

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');
const { portNumber } = require('./utils/config');

const { PORT = portNumber } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

// временное решение авторизации
app.use((req, res, next) => {
  req.user = {
    _id: '64784d01e11468c8fd48461f',
  };

  next();
});

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});

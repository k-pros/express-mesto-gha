const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const router = require('./routes');
const { dbUrl, portNumber} = require('./utils/config');

const { PORT = portNumber } = process.env;

const app = express();

mongoose.connect(dbUrl);

app.use(express.static(path.join(__dirname, 'public')));

// временное решение авторизации
app.use((req, res, next) => {
  req.user = {
    _id: '64784d01e11468c8fd48461f'
  };

  next();
});

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

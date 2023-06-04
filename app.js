const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const router = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

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
const express = require('express');

const { userRouter } = require('./routes/users');
const { cardRouter } = require('./routes/cards');
const { readFileUsers } = require('./routes/users');
const { readFileCards } = require('./routes/cards');

readFileCards();
readFileUsers();

const app = express();
const { PORT = 3000, BASE_PATH } = process.env;

app.use('/', userRouter);
app.use('/', cardRouter);

app.listen(PORT, () => {
  console.log(`App listening at port ${BASE_PATH}`);
});

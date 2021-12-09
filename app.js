const express = require('express');

const app = express();
const { userRouter } = require('./routes/users');
const { cardRouter } = require('./routes/cards');
const { readFileUsers } = require('./routes/users');
const { readFileCards } = require('./routes/cards');

readFileCards();
readFileUsers();

const { PORT = 3000 } = process.env;

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

const express = require('express');

const { userRouter } = require('./routes/users');
const { cardRouter } = require('./routes/cards');

const app = express();
const { PORT = 3000 } = process.env;

app.use('/', userRouter);
app.use('/', cardRouter);
app.use((req, res, next) => {
  res.status(404).send({ message: `Route ${req.url} Not found.` });
  next();
});

app.use((err, req, res, next) => {
  res.status(500).send({ error: err });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

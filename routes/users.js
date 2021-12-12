const userRouter = require('express').Router();
const fs = require('fs');
const path = require('path');
const users = require('../data/users.json');

const readFileUsers = () => {
  const filePath = path.join(__dirname, '../data/users.json');
  fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
    console.log(data);
  });
};

userRouter.get('/users', (req, res) => {
  res.send(users);
});

userRouter.get('/users/:id', (req, res) => {
  if (!users[req.params.id]) {
    res.status(404).send({ message: 'User ID not found' });
    return;
  }
  res.status(200).send(users[req.params.id]);
});

module.exports = {
  userRouter,
  readFileUsers,
};

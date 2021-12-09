const userRouter = require('express').Router();
const fs = require('fs');
const path = require('path');
const users = require('../data/users.json');

const readFileUsers = () => {
  const filePath = path.join(__dirname, '../data/users.json');
  console.log('path', filePath);
  fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
    console.log(data);
  });
};

userRouter.get('/users', (req, res) => {
  if (!users[req.params]) {
    res.send('This user doesn`t exist');
    return;
  }
  res.send(req.params);
});

module.exports = {
  userRouter,
  readFileUsers,
};

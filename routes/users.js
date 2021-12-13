const userRouter = require('express').Router();
const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, '../data/users.json');

userRouter.get('/', (req, res) => {
  fs.readFile(filePath, { encoding: 'utf8' })
    .then((users) => {
      const parsedUsersData = JSON.parse(users);
      res.status(200).send({ data: parsedUsersData });
    })
    .catch(() => {
      res.status(500).send({ message: 'An error is found' });
    });
});

userRouter.get('/users', (req, res) => {
  fs.readFile(filePath, 'utf8')
    .then((users) => {
      const parsedUsersData = JSON.parse(users);
      res.status(200).send({ data: parsedUsersData });
    })
    .catch(() => {
      res.status(404).send({ message: 'An error is found' });
    });
});

userRouter.get('/users/:id', (req, res) => {
  fs.readFile(filePath, { encoding: 'utf8' })
    .then((users) => {
      const parsedCardsData = JSON.parse(users);
      const user = parsedCardsData.find((data) => data._id === req.params.id);
      if (!user) {
        res.status(404).send({ message: 'user not found' });
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch(() => res.status(500).send({ message: 'An error has occurred' }));
});

module.exports = {
  userRouter,
};

const cardRouter = require('express').Router();
const fs = require('fs');
const path = require('path');
const cards = require('../data/cards.json');

const readFileCards = () => {
  const filePath = path.join(__dirname, '../data/cards.json');
  console.log('path', filePath);
  fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
    console.log(data);
  });
};

cardRouter.get('/users', (req, res) => {
  if (!cards[req.params]) {
    res.send('This card doesn`t exist');
    return;
  }
  res.send(req.params);
});

module.exports = {
  cardRouter,
  readFileCards,
};

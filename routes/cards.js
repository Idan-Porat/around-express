const cardRouter = require('express').Router();
const fs = require('fs');
const path = require('path');
const cards = require('../data/cards.json');

const readFileCards = () => {
  const filePath = path.join(__dirname, '../data/cards.json');
  fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
    console.log(data);
  });
};

cardRouter.get('/cards', (req, res) => {
  res.send(cards);
});

cardRouter.get('/cards/:id', (req, res) => {
  if (!cards[req.params.id]) {
    res.send({ message: 'Card ID not found' });
    return;
  }
  res.send(cards[req.params.id]);
});

module.exports = {
  cardRouter,
  readFileCards,
};

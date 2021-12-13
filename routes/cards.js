const cardRouter = require('express').Router();
const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, '../data/cards.json');

cardRouter.get('/cards', (req, res) => {
  fs.readFile(filePath, 'utf8')
    .then((cards) => {
      const parsedCardsData = JSON.parse(cards);
      res.status(200).send({ data: parsedCardsData });
    })
    .catch(() => {
      res.status(500).send({ message: 'An error is found' });
    });
});

cardRouter.get('/cards/:id', (req, res) => {
  fs.readFile(filePath, { encoding: 'utf8' })
    .then((cards) => {
      const parsedCardsData = JSON.parse(cards);
      const card = parsedCardsData.find((data) => data.owner._id === req.params.id);
      if (!card) {
        res.status(404).send({ message: 'card not found' });
      } else {
        res.status(200).send({ data: card.owner });
      }
    })
    .catch(() => res.status(500).send({ message: 'An error has occurred' }));
});

module.exports = {
  cardRouter,
};

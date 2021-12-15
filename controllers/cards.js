const Card = require('../models/cards');

module.exports.getCards = (req, res) => {
  Card.find({})
    .orFail(() => {
      const error = new Error('No card found');
      error.statusCode = 404;
      throw error; // Remember to throw an error so .catch handles it instead of .then
    })
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid card' });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message } || 'internal server error');
      }
    });
};

module.exports.createCard = (req, res) => {
  const { _id } = req.user;
  const {
    name, imageLink,
  } = req.body;
  Card.create(
    {
      name, imageLink, owner: _id,
    },
  )
    .orFail(() => {
      const error = new Error('Invalid data');
      error.statusCode = 400;
      throw error; // Remember to throw an error so .catch handles it instead of .then
    })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid card' });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message } || 'internal server error');
      }
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .orFail(() => {
      const error = new Error('No card found with that id');
      error.statusCode = 404;
      throw error; // Remember to throw an error so .catch handles it instead of .then
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid card' });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message } || 'internal server error');
      }
    });
};

module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: _id } }, // add _id to the array if it's not there yet
    { new: true },
  ).orFail(() => {
    const error = new Error('No card found with that id');
    error.statusCode = 404;
    throw error; // Remember to throw an error so .catch handles it instead of .then
  })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid card' });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message } || 'internal server error');
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: _id } }, // remove _id from the array
    { new: true },
  ).orFail(() => {
    const error = new Error('No card found with that id');
    error.statusCode = 404;
    throw error; // Remember to throw an error so .catch handles it instead of .then
  })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid card' });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message } || 'internal server error');
      }
    });
};

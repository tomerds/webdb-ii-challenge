const express = require('express');
const db = require('../dbConfig');
const router = express.Router();

router.get('/', (req, res) => {
  db.from('car-data').select()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({ error: 'You have encountered an error' });
    })
});

router.post('/', (req, res) => {

  const changes = req.body;

  if (!changes.make || !changes.model || !changes.mileage) {
    res.status(500).json({ error: 'Complete make, model, and mileage' })
  }
  else {
    db('car-data').insert(changes)
      .then(total => {
        res.status(201).json(total)
      })
      .catch(err => {
        res.status(500).json(err);
      })
  }
});



module.exports = router;
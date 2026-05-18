const express = require('express');
const router = express.Router();

const playersController = require('../controllers/players');

router.get('/', playersController.getAll);

router.get('/:id', playersController.getSingle);

router.post('/', playersController.createPlayers);

router.put('/:id', playersController.updatePlayers);

router.delete('/:id', playersController.deletePlayers);


module.exports = router;
const express = require('express');
const router = express.Router();

const playersController = require('../controllers/players');

const validation = require('../middleware/validate');

const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', playersController.getAll);

router.get('/:id', playersController.getSingle);

router.post('/', isAuthenticated, validation.savePlayer, playersController.createPlayers);

router.put('/:id', isAuthenticated, validation.savePlayer, playersController.updatePlayers);

router.delete('/:id', isAuthenticated, playersController.deletePlayers);


module.exports = router;
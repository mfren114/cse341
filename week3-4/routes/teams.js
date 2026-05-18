const express = require('express');
const router = express.Router();

const teamsController = require('../controllers/teams');

router.get('/', teamsController.getAll);

router.get('/:id', teamsController.getSingle);

router.post('/', teamsController.createTeams);

router.put('/:id', teamsController.updateTeams);

router.delete('/:id', teamsController.deleteTeams);


module.exports = router;
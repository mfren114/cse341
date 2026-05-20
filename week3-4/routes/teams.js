const express = require('express');
const router = express.Router();

const teamsController = require('../controllers/teams');

const validation = require('../middleware/validate')

router.get('/', teamsController.getAll);

router.get('/:id', teamsController.getSingle);

router.post('/', validation.saveTeam, teamsController.createTeams);

router.put('/:id', validation.saveTeam, teamsController.updateTeams);

router.delete('/:id', teamsController.deleteTeams);


module.exports = router;
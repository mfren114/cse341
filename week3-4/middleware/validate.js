const { createTeams } = require('../controllers/teams')
const { createPlayers } = require('../controllers/players')
const validator = require('../helpers/validate')

const savePlayer = (req, res, next) => {
    const validationRule = {
        firstName: 'required|string',
        lastName: 'required|string',
        team: 'required|string',
        number: 'required|integer',
        height: 'required|integer',
        weight: 'required|integer',
        vertical: 'required|integer' 
    };
    validator(req.body, validationRule, {}, (err,status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const saveTeam = (req, res, next) => {
    const validationRule = {
        name: 'required|string',
        city: 'required|string'
    }
    validator(req.body, validationRule, {}, (err,status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};
module.exports = {
    savePlayer,
    saveTeam
};
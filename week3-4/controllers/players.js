const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['players']
    try{
        const result = await mongodb.getDatabase().db().collection('players').find().toArray();
    
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({message: err.message || 'An error occured'});
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['players']
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('players').find({_id: userId}).toArray();
        
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    } catch (err) {
        res.status(400).json({message: err.message || 'An error occured'});
    }
};


const createPlayers = async (req, res) => {
    //#swagger.tags=['players']
    const players = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        team: req.body.team,
        number: req.body.number,
        height: req.body.height,
        weight: req.body.weight,
        vertical: req.body.vertical
    };
    try {
        const response = await mongodb.getDatabase().db().collection('players').insertOne(players);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occured while creating the player');
        }
    } catch (error) {
        console.error('Database Error', error);
        res.status(500).json(error.message || 'Some error occured while creating the player');
    }
};

const updatePlayers = async (req, res) => {
    //#swagger.tags=['players']
    const userId = new ObjectId(req.params.id);
    const players = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        team: req.body.team,
        number: req.body.number,
        height: req.body.height,
        weight: req.body.weight,
        vertical: req.body.vertical
    };
    try {
        const response = await mongodb.getDatabase().db().collection('players').replaceOne({_id: userId}, players);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occured while updating the player')
        }
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json(error.message || 'Some error occurred while updating the player');
    }
};

const deletePlayers = async (req, res) => {
    //#swagger.tags=['players']
    try {
        const userId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('players').deleteOne({_id: userId});
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occured while deleting the player')
        }
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json(error.message || 'Some error occurred while deleting the player');
    }
}

module.exports = {
    getAll,
    getSingle,
    createPlayers,
    updatePlayers,
    deletePlayers
};
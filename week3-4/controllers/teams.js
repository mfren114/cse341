const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['teams']
    try{
        const result = await mongodb.getDatabase().db().collection('teams').find().toArray();
    
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({message: err.message || 'An error occured'});
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['teams']
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('teams').find({_id: userId}).toArray();
        
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    } catch (err) {
        res.status(400).json({message: err.message || 'An error occured'});
    }
};

const createTeams = async (req, res) => {
    //#swagger.tags=['teams']
    const teams = {
        name: req.body.name,
        city: req.body.city
    };
    const response = await mongodb.getDatabase().db().collection('teams').insertOne(teams);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured white updating the team')
    }
};

const updateTeams = async (req, res) => {
    //#swagger.tags=['teams']
    const userId = new ObjectId(req.params.id);
    const teams = {
        name: req.body.name,
        city: req.body.city
    };
    const response = await mongodb.getDatabase().db().collection('teams').replaceOne({_id: userId}, teams);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the team')
    }
};

const deleteTeams = async (req, res) => {
    //#swagger.tags=['teams']
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('teams').deleteOne({_id: userId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while deleting the team')
    }
}

module.exports = {
    getAll,
    getSingle,
    createTeams,
    updateTeams,
    deleteTeams
};
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
};

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('contacts').find({_id: userId});
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    });
};

const createContacts = async (req, res) => {
    const contacts = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('contacts').insertOne(contacts);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured white updating the contact')
    }
};

const updateContacts = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const contacts = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('contacts').replaceOne({_id: userId}, contacts);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the contact')
    }
};

const deleteContacts = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({_id: userId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while deleting the contact')
    }
}

module.exports = {
    getAll,
    getSingle,
    createContacts,
    updateContacts,
    deleteContacts
};


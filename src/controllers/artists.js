const { Artist } = require('../models');


exports.create = (req, res) => {
//    console.log(req.body);
    Artist.create(req.body)
    .then(artist => res.status(201).json(artist))
    .catch(error => {
        console.log(error);
        res.status(400).send();
    });
};

exports.list = (req, res) => {
    //console.log(req.body)
    Artist.findAll({}).then(list => {
        res.status(200).json(list)
        .catch(error => {
            console.log(error);
            res.status(400).send();
        })
    });
};

exports.updateArtist = (req, res) => {
    const { id } = req.params;
    Artist.update(req.body, { where: { id } }).then(([rowsUpdated]) => {
        if (!rowsUpdated) {
            res.status(404).json({ error: 'The artist could not be found.' });
        } else {
            res.status(200).json(rowsUpdated);
        }
    });
};


const Sequelize = require('sequelize');
const { Albums } = require('../models/albums');
const { Artist } = require('../models/artist');

exports.create = (req, res) => {
    Artist.findById(req.params.artistId, (err, artist) => {
        if(err) {
            res.send('Artist does not exist');
        }
        const myAlbum = new Albums({
            artist, 
            name: req.body.name,
            year: req.body.year,
        });

        myAlbum.save((createErr, createdAlbum) => {
            if(createErr) {
                res.send('could not create album');
            }
            res.status(201).send(createdAlbum);
        });
    });
};
const { Artist } = require('../models');
const artist = require('../models/artist');


exports.create = (req, res) => {
//    console.log(req.body);
    Artist.create(req.body)
    .then(artist => res.status(201).json(artist)) //creates a new record on artist table
    .catch(error => {
        console.log(error);
        res.status(400).send();
    });
};


exports.list = (req, res) => {
    Artist.findAll({})
      .then((list) => res.status(200).json(list))
      .catch((error) => {
        console.log(error);
        res.status(400).send();
      });
};

exports.getArtistById = (req, res) => {
    const { id } = req.params;
    Artist.findByPk(id).then((artist) => {
        if (!artist) {
            res.status(404).json({ error: 'The artist could not be found. '});
        } else {
            res.status(200).json(artist);
        }
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


exports.updateArtistName = (req, res) => {
    const { name } = req.params;
    Artist.update(req.body, { where: { name } }).then(([rowsUpdated]) => {
        if (!rowsUpdated) {
            res.status(404).json({ error: 'The artist could not be found.' });
        } else {
            res.status(200).json(rowsUpdated);
        }
    });
};

exports.deleteArtistById = (req, res) => {
    const artistId = req.params.artistId;
    Artist.destroy({ where: { id: artistId } }).then((artistDeleted) => {
        res.status(204).send('Sildik popi');
    }).catch(error => {
        console.log({error})
        res.status(404).send("not ok!");
    })
};
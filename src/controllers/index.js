const { Artist } = require('../models');





const createArtist = (req, res) => {
    //req.body
    console.log('here is the req body', req.body);
    Artist.create(req.body).then(recordCreated => {
        console.log({ recordCreated });
        res.status(201).send(recordCreated);
    }).catch(error => {
        res.status(400).send('not ok');
    })
};

const getAllArtists = (req, res) => {
    const genreToSearch = req.query.genre;
    let filter = {};
    if (genreToSearch) {
      filter = { where: { genre: genreToSearch } };
    }
    Artist.findAll(filter).then((records) => {
      res.status(200).send(records);
    });
  };
};

const getArtistById = (req, res) => {
    const artistId = req.params.artistId;
    Artist.findByPk(artistId).then((sonuc) =>{
        res.status(200).send(sonuc);
    });
};
module.exports = {createArtist, getArtistById, getAllArtists};
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


const getArtistById = (req, res) => {
  const artistId = req.params.artistId;
  Artist.findByPk(artistId).then((sonuc) => {
    res.status(200).send(sonuc);
  });
};

const patchArtistById = (req, res) => {
  const artistId = req.params.artistId;
  Artist.findByPk(artistId).then((result) => {
    const results = 'Psychedelic Rock';
    res.status(200).send(result);
  });
}

module.exports = { createArtist, getArtistById, getAllArtists, patchArtistById };


/* 
exports.getArtistById = (req, res) => {
  const { id } = req.params;
  Artist.findByPk(id).then(artist => {
    if (!artist) {
      res.status(404).json({ error: 'The artist could not be found.' });
    } else {
      res.status(200).json(artist);
    }
  });
};

*/
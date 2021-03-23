const express = require('express');
const { create } = require('./controllers/artists');
const { Artist, updateArtist, updateArtistName, getArtistById, list, deleteArtistById} = require('./models/artist');
const artists = require('./controllers/artists');

const { Album } = require('./models/albums');
const albums = require('./controllers/albums');

const app = express();
app.use(express.json());

const artistControllers = require('./controllers/artists');

app.post('/artists', artists.create);
app.get('/artists', artists.list);
app.get('/artists/:id', artists.getArtistById);
app.patch('/artists/:id', artists.updateArtist);
app.patch('/artists/:name', artists.updateArtistName);
app.delete('/artists/:artistId', artists.deleteArtistById);


//albums




//app.post('/artists/:artistId/albums', function (req, res) {
//    create(req, res)
//});

module.exports = app;
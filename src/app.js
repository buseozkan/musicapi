const express = require('express');
const { create, getAllArtists, getArtistById, deleteArtistById } = require('./controllers/artists');
const { Artist } = require('./models/artist');

const app = express();
app.use(express.json());

const artistControllers = require('./controllers/artists');

app.post('/artists', function (req, res) {
    create(req, res)
});
app.get('/artists', function(req,res) {
    getAllArtists(req, res)
});
app.get('/artists/:artistsID', function(req, res) {
    getArtistById(req, res)
});
app.delete('/artists/:artistID', function(req, res){ 
    deleteArtistById(req, res)
}); 

//app.post('/artists', artistControllers.create);




module.exports = app;
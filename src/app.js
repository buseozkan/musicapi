const express = require('express');
const { create } = require('./controllers/artists');
const { getArtistById, deleteArtistById, patchArtistById } = require('./controllers/index');
const { Artist } = require('./models/artist');
const artists = require('./controllers/artists');

const app = express();
app.use(express.json());

const artistControllers = require('./controllers/artists');

app.post('/artists', function (req, res) {
    create(req, res)
});

app.get('/artists', artists.list);

/*app.get('/artists', function(req,res) {
    threeartist(req, res)
});*/

app.get("/artists/:artistId", function (req, res) {
    getArtistById(req, res)
});

app.patch("/artists/:artistId", function (req, res) {
    patchArtistById(req, res)
});


app.delete('/artists/:artistId', function(req, res){ 
    deleteArtistById(req, res)
}); 

//app.post('/artists', artistControllers.create);




module.exports = app;
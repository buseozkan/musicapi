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
module.exports = createArtist;
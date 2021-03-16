const { Artist } = require('../models');


exports.create = (req, res) => {
//    console.log(req.body);
    Artist.create(req.body)
    .then(artist => res.status(201).json(artist))
    .catch(error => {
        console.log(error);
        res.status(400).send();
    })
};
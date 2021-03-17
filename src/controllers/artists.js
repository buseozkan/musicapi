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



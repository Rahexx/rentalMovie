const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

router.all('*', (req, res, next) => {
    if (!req.session.admin) {
        res.redirect('/login');

        return;
    }

    next();
});

router.get('/', function (req, res) {
    const newMovie = new Movie();

    const findMovie = Movie.find();

    findMovie.exec((err, data) => {
        res.render('movie', {data});
    });
});

module.exports = router;
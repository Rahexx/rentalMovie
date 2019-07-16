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
    const sessionRole = req.session.role;
    console.log(`Twoja rola to: ${sessionRole}`);
    const newMovie = new Movie();

    const findMovie = Movie
        .find()
        .sort({ title: 1 })
        .limit(6);

    findMovie.exec((err, data) => {
        res.render('movie', { data, sessionRole});
    });
});

module.exports = router;

//Add movie to dz

router.get('/addMovie', (req, res) => {
    res.render('addFilm', { title: 'Dodaj film' });
})

router.post('/addMovie', (req, res) => {
    console.log(req.body);

    if (req.body.checkbox) {
        const addFilm = new Movie({
            title: req.body.title,
            category: req.body.category,
            production: req.body.production,
            year: req.body.year,
            description: req.body.description,
        });

        addFilm.save((err) => {
            if (err) {
                res.redirect('./addFilm');
                return;
            }

            res.redirect('/movie');
        });
    } else {
        res.redirect('./addMovie');
    }
})

module.exports = router;
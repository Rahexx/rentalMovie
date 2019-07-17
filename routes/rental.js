const express = require('express');
const Movie = require('../models/movie');
const User = require('../models/user');
const Rental = require('../models/rental');
const router = express.Router();


router.all('*', (req, res, next) => {
    if (!req.session.admin) {
        res.redirect('login');

        return;
    }
    next();
});

/* GET users listing. */
router.get('/', function (req, res, next) {
    const sessionRole = req.session.role;
    const sessionId = req.session.id; 
    const date = Date.now();
    let dateReturne = new Date(date);

    const findrental = Rental
        .find({ $and: [{ 'user._id': sessionId }, { dateReturned: { $gte: dateReturne } }] });

    const findOldRental = Rental
        .find({ $and: [{ 'user._id': sessionId }, { dateReturned: { $lt: dateReturne } }] });

    findrental.exec((err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(data);
            findOldRental.exec((err2, data2) => {
                if (err2) {
                    console.log(err2);
                }
                else {
                    console.log(data2);
                    res.render('rental', { sessionRole, data, data2 });
                }
            });
        }
    });
});

//let date = Date.now();
//let thirstyDays = 30 * 24 * 60 * 60 * 1000;

//let dateTirstyDaysEarly = date - (42 * 24 * 60 * 60 * 1000);
//let dateTirstyDaysLate = dateTirstyDaysEarly + thirstyDays;

//let dateReturne = new Date(dateTirstyDaysLate);
//let dateOutd = new Date(dateTirstyDaysEarly);

//const user = User.findById(sessionId);
//const movie = Movie.findById("5d2c35761c9d44000009235c");

//user.exec((errUser, dateUser) => {
//    if (errUser) {
//        console.log("User nie przeszedl");
//    }
//    else {
//        movie.exec((errMovie, dateMovie) => {
//            if (errMovie) {
//                console.log("Film nie przeszedl");
//            }
//            else {
//                const addRental = new Rental({
//                    user: {
//                        _id: dateUser._id,
//                        firstName: dateUser.firstName,
//                        lastName: dateUser.lastName,
//                        username: dateUser.username,
//                    },
//                    movie: {
//                        _id: dateMovie._id,
//                        title: dateMovie.title
//                        description: dateMovie.description,
//                        cost: dateMovie.cost,
//                    },
//                    dateReturned: dateReturne,
//                    dateOut: dateOutd,
//                });

//                addRental.save((err) => {
//                    if (err) {
//                        console.log("Nie zapisalo sie");
//                    }
//                });
//            }
//        });
//    }
//});

module.exports = router;
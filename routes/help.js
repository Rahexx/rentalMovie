const express = require('express');
const router = express.Router();
const Help = require('../models/help');
const User = require('../models/user');

router.all('*', (req, res, next) => {

    if (!req.session.admin) {
        res.redirect('/login');
        return;
    }

    next();
});

router.get('/', (req, res) => {
    const sessionRole = req.session.role;

    const findHelp = Help.find();

    findHelp.exec((err, data) => {
        console.log(data);

        if (err) {
            console.log(`Twoj blad to: ${err}`);
        }
        else {
            res.render('help', {data, sessionRole});
        }
    });
});

router.get('/addHelp', (req, res) => {
    res.render('addHelp');
});

router.post('/addHelp', (req, res) => {
    const sessionRole = req.session.role;
    const sessionId = req.session.id; 

    const user = User.findById(sessionId);

    user.exec((err, dateUser) => {
        if (req.body.checkbox) {
            const addHelp = new Help({
                title: req.body.title,
                description: req.body.description,
                user: {
                    _id: dateUser._id,
                    username: dateUser.username
                }
            });

            addHelp.save((err) => {
                if (err) {
                    console.log(`Lap error: ${err}`)
                    res.redirect('./addHelp');
                    return;
                }
                else {
                    res.redirect('/help');
                }
            });
        }
        else {
            res.redirect('./addHelp');
        }
    });
});

module.exports = router;
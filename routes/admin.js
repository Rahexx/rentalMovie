const express = require('express');
const Help = require('../models/help');
const User = require('../models/user');
const router = express.Router();


router.get('/', (req, res) => {

    const findUser = User.find();

    findUser.exec((err, data) => {
        const i = 1;
        res.render('admin', {data, i});
    });
});

router.get('/delete/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id, (err) => {
        res.redirect('/admin');
    })
});

//helpdesk - list of problem and change value problem

router.get('/helpdesk', (req, res) => {
    const sessionRole = req.session.role;
    const sessionId = req.session.id;


    const findOldHelp = Help
        .find({ $or: [{ status: 'Oczekujacy' }, { status: 'W toku' }] })
        .sort({ notificationTime: 1 });

    findOldHelp.exec((err, data) => {
        if (err) console.log(`Twoj blad to: ${err}`);
        else {
            console.log(data);
            res.render('helpdesk', { data, sessionRole });
        }
    });
});

router.get('/update/:id', (req, res) => {
    req.session.updateID = req.params.id;

    res.render('updateHelp');
});

router.post('/update/:id', (req, res) => {
    const sessionUpdateID = req.session.updateID;
    const statusHelp = req.body.status;

    if (statusHelp === "Zakonczony") {
        Help.findByIdAndUpdate(sessionUpdateID, { $set: { status: statusHelp, timeSolveProblem: Date.now() } }, (err) => {
                res.redirect('../helpdesk');
        });
    }
    else {
        Help.findByIdAndUpdate(sessionUpdateID, { $set: { status: statusHelp } }, (err) => {
                res.redirect('../helpdesk');
        });
    }
});


module.exports = router;

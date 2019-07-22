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
    const sessionId = req.session.id; 

    const findHelp = Help
        .find({ $and: [{ 'user._id': sessionId }, { $or: [{ status: 'Oczekujacy' }, { status: 'W toku' }] }] })
        .sort({ notificationTime: 1 });;

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

router.get('/historyHelp', (req, res) => {
    const sessionRole = req.session.role;
    const sessionId = req.session.id; 


    const findOldHelp = Help
        .find({ $and: [{ 'user._id': sessionId }, { status: 'Zakonczony' }] })
        .sort({ timeSolveProblem: 1});

    findOldHelp.exec((err, data) => {
        if (err) console.log(`Twoj blad to: ${err}`);
        else {
            console.log(data);
            res.render('historyHelp', { data, sessionRole });
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

router.get('/sendMessage/:id', (req, res) => {
    req.session.sendID = req.params.id;

    res.render('sendMessage');
});

router.post('/sendMessage/:id', (req, res) => {
    const sendMessageID = req.session.sendID;
    const messageUser = req.body.messageUser;
    const sessionRole = req.session.role;
    const messages = `${sessionRole}: ${messageUser}`;

    console.log(messages);

    Help.findByIdAndUpdate(sendMessageID, { $push: { message: messages } }, (err) => {
            res.redirect('../../help');
    });

    //Help.update({ _id: sendMessageID }, { $push: { message: messages } }, (err2) => {
    //    res.redirect('/help');
    //});
});

module.exports = router;
const express = require('express');
const User = require('../models/user');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    cookie = req.session.admin;
    sessionRole = req.session.role;
    res.render('index', { cookie, sessionRole });
});

//Get login page
router.get('/login', function (req, res, next) {
    req.session.userDB = 0;
    res.render('log');
});

router.post('/login', function (req, res, next) {
    req.session.admin = 1;
    const body = req.body;
    const login = body.login;
    const password = body.password;


    const finduser = User
        .find({username: login});

    finduser.exec((err, data2) => {
        if (err) {
            console.log(err);
            res.redirect('./login');
        }
        else {
            if (data2.length > 0) {
                if ((login === data2[0].username) && (password === data2[0].password)) {
                    req.session.role = data2[0].role;
                    req.session.id = data2[0]._id;
                    res.redirect('./rental');
                }
                else {
                    res.redirect('./login');
                }
            }
            else {
                res.redirect('./login');
            }
            
        }
    });
});


//logout user

router.get('/logout', function (req, res, next) {
    req.session.admin = 0;
    req.session.role = 'normal';
    res.redirect('/');
})

//Get register page

router.get('/sign', function (req, res, next) {
    const userDB = req.session.userDB;
    console.log('laduje userDB: ' + userDB);

    res.render('sign', { userDB });
  
});

router.post('/sign', function (req, res, next) {
    console.log(req.body);

    if (req.body.checkbox) {

        const findUser = User
            .find({ username: req.body.username });
        findUser.exec((err, data) => {
            if (data.username == req.body.username) {
                req.session.userDB = 0;

                const adduser = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    username: req.body.username,
                    password: req.body.pass,
                    email: req.body.email
                });

                adduser.save((err) => {
                    if (err) {
                        res.redirect('./sign');
                        return;
                    }

                    res.redirect('./login');
                });

            }
            else {
                req.session.userDB = 1;
                console.log('Jest juz taki uzytkownik');
                res.redirect('./sign');
            }
        });
    }
    else {
        res.redirect('./sign');
    }
});


module.exports = router;

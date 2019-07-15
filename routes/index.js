var express = require('express');
const User = require('../models/user');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    cookie = req.session.admin;
    res.render('index', {cookie});
});


//Get login page
router.get('/login', function (req, res, next) {
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
        if (login === data2[0].username && password === data2[0].password) {
            res.redirect('./rental');
        }
        else {
            res.redirect('./login');
        }
    });
});

//Get register page

router.get('/logout', function (req, res, next) {
    req.session.admin = 0;
    res.redirect('/');
})

module.exports = router;

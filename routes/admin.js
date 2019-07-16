const express = require('express');
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

module.exports = router;

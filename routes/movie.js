var express = require('express');
var router = express.Router();

router.all('*', (req, res, next) => {
    if (!req.session.admin) {
        res.redirect('/login');

        return;
    }

    next();
});

router.get('/',function (req, res){
    res.render('movie');
});

module.exports = router;
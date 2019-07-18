const express = require('express');
const router = express.Router();

router.all('*', (req, res, next) => {

    if (!req.session.admin) {
        res.redirect('/login');
        return;
    }

    next();
});

router.get('/', (req, res) => {
    res.render('help');
});

module.exports = router;
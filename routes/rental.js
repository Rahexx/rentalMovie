var express = require('express');
var router = express.Router();


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
    res.render('rental', {sessionRole});
});

module.exports = router;

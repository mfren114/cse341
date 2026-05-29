const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'));

//router.get('/', (req, res) => {
    //#swagger.tags=['Personal Project Test']
    //res.send('Personal Project Test');
//});

router.use('/players', require('./players'));
router.use('/teams', require('./teams'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});
router

module.exports = router;
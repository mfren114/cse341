const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Personal Project Test']
    res.send('Personal Project Test');
});

router.use('/players', require('./players'));
router.use('/teams', require('./teams'));

module.exports = router;
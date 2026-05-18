const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Personal Project Test');
});

router.use('/players', require('./players'));
router.use('/teams', require('./teams'));

module.exports = router;
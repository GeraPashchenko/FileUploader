const router = require('express').Router();
const userComponent = require('./user');
const fileComponent = require('./file');

router.use('/users', userComponent);
router.use('/files', fileComponent);

module.exports = router;
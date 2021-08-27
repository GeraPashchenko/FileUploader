const router = require('express').Router();
const userComponent = require('./user');

router.use('/user', userComponent);

module.exports = router;
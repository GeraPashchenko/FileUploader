const router = require('express').Router();
const userResolver = require('../resolvers/user');
const passport = require('../config/passport');

router.get('/:id', passport.authenticate('jwt', {session: false}), userResolver.getUserById);
router.post('/', passport.authenticate('jwt', {session: false}), userResolver.addUser);
router.post('/login', userResolver.login);

module.exports = router;

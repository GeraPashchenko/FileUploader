const router = require('express').Router();
const userResolver = require('../resolvers/user');

router.get('/:id', userResolver.getUserById);
router.post('/', userResolver.addUser);
// router.post('/login', )

module.exports = router;

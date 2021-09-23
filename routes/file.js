const router = require('express').Router();
const fileResolver = require('../resolvers/file');
const passport = require('../config/passport');
const { upload } = require('../config/multer');

router.post('/', passport.authenticate('jwt', { session: false }), upload.single('userFile'), fileResolver.uploadFile);
router.get('/', passport.authenticate('jwt', { session: false }), fileResolver.getAllUserFiles);
router.get('/:id', fileResolver.getFileById);
router.delete('/:id', passport.authenticate('jwt', { session: false }), fileResolver.getAllUserFiles)

module.exports = router;

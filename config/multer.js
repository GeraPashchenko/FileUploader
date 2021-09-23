const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { errors } = require('../middleware/error.middleware');

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    if (!fs.existsSync(process.env.FILES_UPLOAD_DIR)) {
      fs.mkdirSync(process.env.FILES_UPLOAD_DIR);
    }
    callback(null, process.env.FILES_UPLOAD_DIR);
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

module.exports.upload = multer({
  storage: storage,
  limits: {
    fieldSize: process.env.FILE_SIZE_RESTRICTION
  },
  fileFilter: function (req, file, callback) {
    let ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return callback(new Error(errors.wrongFileType.message));
    }
    callback(null, true);
  }
});
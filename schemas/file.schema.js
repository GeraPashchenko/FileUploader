const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const { errors } = require('../middleware/error.middleware');
const fs = require('fs');

const File = new Schema({
  owner: ObjectId,
  name: String,
  path: String,
  comment: String,
  uploadingDate: Date,
  dateToRemove: Date,
  views: Number
});

File.pre('save', function (next) {
  if (!this.isModified('uploadingDate')) return next();
  if (fs.existsSync(`../files/${this.path}`)) return next(errors.fileExists);
});

module.exports = mongoose.model('File', File);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const File = new Schema({
  owner: ObjectId,
  originalName: String,
  mimetype: String,
  path: String,
  comment: String,
  uploadingDate: Date,
  dateToRemove: Date,
  views: Number
});

File.pre('save', function (next) {
  if (!this.isModified('uploadingDate')) return next();
  return next();
});

File.methods.getData = function () {
  return {
    owner: this.owner,
    path: this.path,
    originalName: this.originalName,
    mimetype: this.mimetype,
    comment: this.comment,
    uploadingDate: this.uploadingDate,
    dateToRemove: this.dateToRemove,
    views: this.views
  }
}

module.exports = mongoose.model('File', File);

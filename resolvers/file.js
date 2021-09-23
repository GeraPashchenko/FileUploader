const FileModel = require('../schemas/file.schema');
const mongoose = require('mongoose');
const { errors } = require('../middleware/error.middleware');
const fs = require('fs');

module.exports.uploadFile = async (req, res) => {
  const file = new FileModel();
  file.owner = req.user.id;
  file.originalName = req.file.originalname;
  file.path = req.file.filename;
  file.mimetype = req.file.mimetype;
  file.comment = req.body.comment;
  file.uploadingDate = Date.now();
  file.dateToRemove = new Date(req.body.dateToRemove).getTime() || '';
  file.views = 0;

  await file.save();
  const createdFile = await FileModel.findOne({ originalName: req.file.originalname });
  const createdFileData = createdFile.getData();
  res.json(createdFileData);
};

module.exports.getAllUserFiles = async (req, res, next) => {
  const images = await FileModel.find({ owner: req.user.id });
  images.sort(function(a,b){
    return new Date(b.uploadingDate) - new Date(a.uploadingDate);
  });
  res.json({images});
};

module.exports.getFileById = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return next(errors.invalidId);

  const file = await FileModel.findOne({ _id: req.params.id });
  
  if (!file) return next(errors.fileIsNotExists);

  if(!fs.existsSync(`${process.env.FILES_UPLOAD_DIR}/${file.path}`)) return next(errors.fileIsNotExists);

  const fileStream = fs.createReadStream(`${process.env.FILES_UPLOAD_DIR}/${file.path}`);
  res.contentType(file.mimetype);
  fileStream.pipe(res);
};

module.exports.deleteFile = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return next(errors.invalidId);

  const file = await FileModel.findOne({ _id: req.params.id });
  
  if (!file) return next(errors.fileIsNotExists);

  if(!fs.existsSync(`${process.env.FILES_UPLOAD_DIR}/${file.path}`)) return next(errors.fileIsNotExists);

  fs.unlink(`${process.env.FILES_UPLOAD_DIR}/${file.path}`, async (err) => {
    if(err) return next(err);
    await file.remove();
  });

  res.send({message: "Deleted!"});
};

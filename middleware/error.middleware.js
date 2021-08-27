module.exports.errors = {
  fileExists: {
    message: 'File allready exists!',
    statusCode: 400
  },
  wrongPassword: {
    message: 'Wrong password!',
    statusCode: 400
  },
  userExists: {
    message: 'User allready exists!',
    statusCode: 400
  },
  userIsNotExists: {
    message: 'User is not exists!',
    statusCode: 400
  },
  invalidId: {
    message: 'Invalid ObjectId!',
    statusCode: 400
  }
}

module.exports.errorsMiddleware = function (err, req, res, next) {
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).json({ message: err.message });
}
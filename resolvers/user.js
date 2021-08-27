const UserModel = require('../schemas/user.schema');
const mongoose = require('mongoose');
const { errors } = require('../middleware/error.middleware');

module.exports.getUserById = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return next(errors.invalidId);

  const user = await UserModel.findOne({ _id: req.params.id });

  if (!user) return next(errors.userIsNotExists);

  res.json(user);
};

module.exports.addUser = async (req, res, next) => {
  const user = await UserModel.findOne({ username: req.body.username });

  if (user) return next(errors.userExists);

  const userInstanse = new UserModel();
  userInstanse.username = req.body.username;
  userInstanse.password = req.body.password;

  await userInstanse.save();
  res.json(userInstanse);
}
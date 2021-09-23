const UserModel = require('../schemas/user.schema');
const mongoose = require('mongoose');
const { errors } = require('../middleware/error.middleware');

module.exports.getUserById = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return next(errors.invalidId);

  const user = await UserModel.findOne({ _id: req.params.id });

  if (!user) return next(errors.userIsNotExists);

  res.json(user);
};

module.exports.registerUser = async (req, res, next) => {
  const user = await UserModel.findOne({ username: req.body.username });

  if (user) return next(errors.userExists);

  const userInstanse = new UserModel();
  userInstanse.username = req.body.username;
  userInstanse.password = req.body.password;

  await userInstanse.save();
  const createdUser = await UserModel.findOne({ username: req.body.username });
  const createdUserData = createdUser.getMe();
  const token = await createdUser.generateJWT();

  res.json({...createdUserData, token});
};

module.exports.login = async (req, res, next) => {
  const user = await UserModel.findOne({ username: req.body.username });
  if (!user) return next(errors.userIsNotExists);

  const validPassword = await user.validatePassword(req.body.password);

  if(!validPassword) return next(errors.authentificationError);
  const userdata = user.getMe();
  const token = await user.generateJWT();
  res.json({...userdata, token});
}
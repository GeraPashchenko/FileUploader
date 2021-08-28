const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = new Schema({
  username: { type: String },
  password: { type: String, select: false }
});

User.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

User.methods.validatePassword = async function validatePassword(password) {
  const user = await UserModel.findOne({ username: this.username }, 'password').exec();
  return bcrypt.compare(password, user.password);
};

User.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    username: this.username,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, process.env.JWT_SECRET);
};

User.methods.getMe = function () {
  return {
    id: this._id,
    username: this.username,
  }
};

const UserModel = mongoose.model('User', User);

module.exports = UserModel;
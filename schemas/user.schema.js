const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

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
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', User);
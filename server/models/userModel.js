const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.statics.signup = async function (username, email, password) {
  if (!username || !email || !password) {
    throw Error("All fields are required");
  }
  if (!validator.isEmail(email)) {
    throw Error("Invalid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password must contain alphanumerics and symbols");
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email is already in use");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return await this.create({ username, email, password: hashedPassword });
};

UserSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields are required");
  }
  if (!validator.isEmail(email)) {
    throw Error("Invalid email");
  }
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Invalid Crendentials");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Invalid Credentials.");
  }
  return user;
};

module.exports = mongoose.model("users", UserSchema);

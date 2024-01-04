const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const createToken = (id) => {
  return jwt.sign({ _id: id }, SECRET, { expiresIn: "1d" });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.login(email, password);
    const token = createToken(user._id);
    res.json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signupController = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await userModel.signup(username, email, password);
    const token = createToken(user._id);
    res.json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteController = async (req, res) => {
  const { email } = req.body;
  try {
    await userModel.findOneAndDelete({ email });
    res.json({ deleted: true });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { loginController, signupController, deleteController };

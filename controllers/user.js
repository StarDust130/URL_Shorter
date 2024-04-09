const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../services/auth");

const handleUserSignup = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  return res.redirect("/");
};

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
    password,
  });
  if (!user) {
    return res.render("login", {
      error: "Invalid Credentials 🙅‍♂️",
    });
  }

  const token = setUser(user);
  res.cookie("uid", token);

  return res.redirect("/");
};

module.exports = {
  handleUserSignup,
  handleUserLogin,
};

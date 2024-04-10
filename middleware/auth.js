const { getUser } = require("../services/auth");

const checkForAuthentication = (req, res, next) => {
  const authHeaderValue = req.headers["authorization"];

  if (!authHeaderValue || !authHeaderValue.startsWith("Bearer ")) return next();

  const token = authHeaderValue.split(" ")[1];

  getUser();
};

const restrictToLoggedinUserOnly = (req, res, next) => {
  const userUid = req.cookies?.uid;
  if (!userUid) return res.redirect("/login");
  const user = getUser(userUid);

  if (!user) return res.redirect("/login");

  req.user = user;

  next();
};

const checkAuth = (req, res, next) => {
  const userUid = req.cookies?.uid;

  const user = getUser(userUid);

  req.user = user;

  next();
};

module.exports = { restrictToLoggedinUserOnly, checkAuth };

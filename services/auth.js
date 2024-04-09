const jwt = require("jsonwebtoken");
const JWT_SECRET = "5dsdfd1sh21d5s4a";

const setUser = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    JWT_SECRET
  );
};

const getUser = (token) => {
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};
  
module.exports = {
  setUser,
  getUser,
};

const User = require("../models/User");

const jwt = require("jsonwebtoken");


const checkLogin = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization;
    const decoded = jwt.decode(token, process.env.TOKEN_KEY);
    if (!decoded) {
      return res.status(409).json({
        access: "Not allowed Invalid token",
      });
    } else {
      return next();
    }
  } else {
    return res.status(403).json({
      access: "Not allowed",
    });
  }
};

module.exports = checkLogin;

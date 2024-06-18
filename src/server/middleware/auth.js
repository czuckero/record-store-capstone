const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../db");
const { findUserByToken } = require("../db/users");

const isLoggedIn = async (req, res, next) => {
  try {
    console.log("is logged in");
    req.headers.authorization = req.headers.authorization.replace(
      "Bearer ",
      ""
    );
    req.user = await findUserByToken(req.headers.authorization);
    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = (req, res, next) => {
  console.log("is Admin");
  console.log("user:", req.user);
  console.log("admin:", req.user.isadmin);
  if (!req.user || !req.user.isadmin) {
    return res.status(403).json({ message: "Unauthorized: Admin only." });
  }
  next();
};

module.exports = { isLoggedIn, isAdmin };

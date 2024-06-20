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

const is_admin = (req, res, next) => {
  console.log("is Admin");
  console.log("user:", req.user);
  console.log("admin:", req.user.is_admin);
  if (!req.user || !req.user.is_admin) {
    return res.status(403).json({ message: "Unauthorized: Admin only." });
  }
  next();
};

module.exports = { isLoggedIn, is_admin };

const jwt = require("jsonwebtoken");

// authenticate
const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Assumes the token contains the user's info
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized: Invalid token." });
  }
};

module.exports = { authenticateUser };

// check if user is logged in
const isLoggedIn = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized: You must be logged in.",
    });
  }
  next();
};

// check if user is admin
const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.admin) {
    return res.status(403).json({ message: "Unauthorized: admin only" });
  }
  next();
};

module.exports = { authenticateUser, isLoggedIn, isAdmin };

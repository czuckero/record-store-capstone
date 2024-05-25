// middleware file cause ** o r g a n i z a t i o n **

const isLoggedIn = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized: You must be logged in.",
    });
  }
  next();
};

const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.admin) {
    return res.status(403).json({ message: "Unauthorized: admin only" });
  }
  next();
};

module.exports = { isLoggedIn, isAdmin };

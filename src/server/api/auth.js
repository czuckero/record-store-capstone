const express = require("express");
const authRouter = express.Router();
const { getUser, createUser } = require("../db/users");
const jwt = require("jsonwebtoken");
const { getCartItems } = require("../db/cart");

//POST /api/auth/login
authRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await getUser({ email, password });
    if (user) {
      const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET, {
        expiresIn: "1w",
      });
      res.send({ message: "Login successful!", token });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (err) {
    next(err);
  }
});

//POST /api/auth/register
authRouter.post("/register", async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const _user = await getUserByEmail(email);
    if (_user) {
      next({
        name: "UserExistsError",
        message: "A user with that email already exists",
      });
    } else {
      const user = await createUser({ username, email, password });
      const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET, {
        expiresIn: "1w",
      });
      res.send({ message: "Sign up successful!", token });
    }
  } catch (err) {
    next(err);
  }
});

//GET /api/auth/me/cart
authRouter.get("/me/cart", async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cartItems = await getCartItems(userId);
    res.send(cartItems);
  } catch (err) {
    next(err);
  }
});

module.exports = authRouter;

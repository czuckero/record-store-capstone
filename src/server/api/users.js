// user api routes

const express = require("express");
const usersRouter = express.Router();
const { isLoggedIn } = require("../middleware/auth");
const {
  createUser,
  getUser,
  getUserByEmail,
  getUserById,
} = require("../db/users");
const jwt = require("jsonwebtoken");
const {
  addToCart,
  updateCart,
  removeFromCart,
  getCartItems,
} = require("../db/cartItems");

// POST /api/users/register
// handles user registration
usersRouter.post("/register", async (req, res, next) => {
  const { username, email, password, isAdmin } = req.body;

  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      next({
        username: "UserExistsError",
        message: "A user with that email already exists",
      });
    }

    const user = await createUser({
      username,
      email,
      password,
      isAdmin,
    });

    const token = jwt.sign(
      {
        id: user.id,
        email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );

    res.send({
      message: "Sign up successful!",
      token,
    });
  } catch ({ username, message }) {
    next({ username, message });
  }
});

// POST /api/users/login
// handles user login
usersRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both an email and password",
    });
  }
  try {
    const user = await getUser({ email, password });
    if (user) {
      const token = jwt.sign(
        {
          id: user.id,
          email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );

      res.send({
        message: "Login successful!",
        token,
      });
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

// GET /api/users/:id
// gets user by their ID
usersRouter.get("/:id", isLoggedIn, async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

// POST /api/users/:userId/cart/cartItems
// adds an item to user's cart
usersRouter.post(
  "/:userId/cart/cartItems",
  isLoggedIn,
  async (req, res, next) => {
    const { userId } = req.params;
    const { record_id, quantity, price } = req.body;
    try {
      const cartItem = await addToCart({ userId, record_id, quantity, price });
      if (!cartItem) {
        return res.status(400).json({ error: "Unable to add record to cart" });
      }
      res.json({ message: "Record added to cart", cartItem });
    } catch (error) {
      next(error);
    }
  }
);

// PUT /api/users/:userId/cart/:cartItemId
// updates an item in user's cart
usersRouter.put(
  "/:userId/cart/:cartItemId",
  isLoggedIn,
  async (req, res, next) => {
    const { userId, cartItemId } = req.params;
    const { quantity, price } = req.body;
    try {
      const cartItem = await updateCart({
        userId,
        cartItemId,
        quantity,
        price,
      });
      res.json({ message: "Record updated successfully", cartItem });
    } catch (error) {
      next(error);
    }
  }
);

// DELETE /api/users/:userId/cart/cartItems/:cartItemId
// removes an item from user's cart
usersRouter.delete(
  "/:userId/cart/cartItems/:cartItemId",
  isLoggedIn,
  async (req, res, next) => {
    const { userId, cartItemId } = req.params;
    try {
      await removeFromCart({ userId, cartItemId });
      res.json({ message: "Record removed successfully" });
    } catch (error) {
      next(error);
    }
  }
);

// GET /api/users/:userId/cart
// gets items in user's cart
usersRouter.get("/:userId/cart", isLoggedIn, async (req, res, next) => {
  const { userId } = req.params;
  try {
    const cartItems = await getCartItems(userId);
    res.json(cartItems);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;

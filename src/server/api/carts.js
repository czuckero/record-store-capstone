const express = require("express");
const cartRouter = express.Router();
const { getCartItems, clearCart } = require("../db/carts");
const { authenticateUser, isLoggedIn } = require("../middleware/auth");

// Middleware to ensure the user is authenticated
cartRouter.use(authenticateUser);

// GET /api/cart - Get all cart items for the user
cartRouter.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const cartItems = await getCartItems(req.user.id);
    res.send(cartItems);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/cart - Clear the cart
cartRouter.delete("/", isLoggedIn, async (req, res, next) => {
  try {
    await clearCart(req.user.id);
    res.status(204).send(); // 204 No Content
  } catch (err) {
    next(err);
  }
});

module.exports = cartRouter;

const express = require("express");
const cartRouter = express.Router();
const { getCartItems, clearCart } = require("../db/carts");
const { authenticateUser, isLoggedIn } = require("../middleware/auth");

// Middleware to ensure the user is authenticated
cartRouter.use(authenticateUser);

// GET /api/cart
// only logged in users can access their cart
cartRouter.get("/cart", isLoggedIn, async (req, res, next) => {
  try {
    const cartItems = await getCartItems(req.user.id);
    console.log(req.user.id);
    res.send(cartItems);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/cart
// only logged in users can clear their cart
cartRouter.delete("/cart", isLoggedIn, async (req, res, next) => {
  try {
    await clearCart(req.user.id);
    res.status(204).send(); // 204 No Content
  } catch (err) {
    next(err);
  }
});

module.exports = cartRouter;

const express = require("express");
const cartRouter = express.Router();
const {
  getCartItems,
  clearCart,
  addToCart,
  removeFromCart,
  updateCart,
} = require("../db/carts");
const { authenticateUser, isLoggedIn } = require("../middleware/auth");

// Middleware to ensure the user is authenticated
// cartRouter.use(authenticateUser);

// GET /api/cart
// Only logged in users can access their cart
cartRouter.get("/", isLoggedIn, async (req, res, next) => {
  try {
    console.log("helloooooo");
    const cartItems = await getCartItems(req.user.id);
    console.log(req.user.id);
    res.send(cartItems);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/cart
// Only logged in users can clear their cart
cartRouter.delete("/cart", isLoggedIn, async (req, res, next) => {
  try {
    await clearCart(req.user.id);
    res.status(204).send(); // 204 No Content
  } catch (err) {
    next(err);
  }
});

// POST /api/cart/items
// Adds a new item to the user's cart
cartRouter.post("/cart/items", isLoggedIn, async (req, res, next) => {
  const { record_id, quantity, price } = req.body;
  try {
    const cartItem = await addToCart({
      user_id: req.user.id,
      record_id,
      quantity,
      price,
    });
    res.send(cartItem);
  } catch (err) {
    next(err);
  }
});

// PUT /api/cart/items/:recordId
// Updates a record in the user's cart
cartRouter.put("/cart/items/:recordId", isLoggedIn, async (req, res, next) => {
  const { recordId } = req.params;
  const { quantity, price } = req.body;
  try {
    const cartItem = await updateCart({
      user_id: req.user.id,
      record_id: recordId,
      quantity,
      price,
    });
    res.send(cartItem);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/cart/items/:recordId
// Deletes a record from the user's cart
cartRouter.delete(
  "/cart/items/:recordId",
  isLoggedIn,
  async (req, res, next) => {
    const { recordId } = req.params;
    try {
      const cartItem = await removeFromCart({
        user_id: req.user.id,
        record_id: recordId,
      });
      res.send(cartItem);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = cartRouter;

const express = require("express");
const cartRouter = express.Router();
const {
  getCartItems,
  clearCart,
  addToCart,
  removeFromCart,
  updateCart,
} = require("../db/carts");
const { isLoggedIn } = require("../middleware/auth");

// GET /api/cart
// Only logged in users can access their cart
cartRouter.get("/", isLoggedIn, async (req, res, next) => {
  try {
    console.log("Fetching cart items");
    const cartItems = await getCartItems(req.user.id);
    console.log(`User ID: ${req.user.id}`);
    res.send(cartItems);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/cart
// Only logged in users can clear their cart
cartRouter.delete("/", isLoggedIn, async (req, res, next) => {
  try {
    console.log("Clearing cart");
    await clearCart(req.user.id);
    console.log(`User ID: ${req.user.id}`);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

// POST /api/cart/cartItems
// Adds a new item to the user's cart
cartRouter.post("/cartItems", isLoggedIn, async (req, res, next) => {
  try {
    console.log("Adding to cart");
    const { record_id, quantity, price } = req.body;
    const cartItem = await addToCart({
      user_id: req.user.id,
      record_id,
      quantity,
      price,
    });
    console.log(`User ID: ${req.user.id}`);
    res.send(cartItem);
  } catch (err) {
    next(err);
  }
});

// PUT /api/cart/cartItems
// Updates a record in the user's cart
cartRouter.put("/cartItems", isLoggedIn, async (req, res, next) => {
  const { record_id, quantity, price } = req.body;
  console.log("Updating cart item");
  try {
    const updatedCartItem = await updateCart({
      user_id: req.user.id,
      record_id,
      quantity,
      price,
    });
    console.log(`User ID: ${req.user.id}`);
    res.send({ message: "Cart Item updated", cartItem: updatedCartItem });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/cart/cartItems/:cartItemId
// Deletes a record from the user's cart
cartRouter.delete(
  "/cartItems/:cartItemId",
  isLoggedIn,
  async (req, res, next) => {
    const { cartItemId } = req.params;
    try {
      const cartItem = await removeFromCart({
        user_id: req.user.id,
        record_id: cartItemId,
      });
      res.send(cartItem);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = cartRouter;

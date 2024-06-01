const express = require("express");
const cartRouter = express.Router();
const { addToCart, removeFromCart, updateCart } = require("../db/cartItems");
const { isLoggedIn } = require("../middleware/auth");

// POST /api/cart
// adds a new item to logged in user's cart
cartRouter.post("/", isLoggedIn, async (req, res, next) => {
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

// PUT /api/cart/:recordId
// updates a record in a logged in user's cart
cartRouter.put("/:recordId", isLoggedIn, async (req, res, next) => {
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

// DELETE /api/cart/:recordId
// deletes a record from a logged in user's cart
cartRouter.delete("/:recordId", isLoggedIn, async (req, res, next) => {
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
});

module.exports = cartRouter;

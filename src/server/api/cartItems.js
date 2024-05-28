const express = require("express");
const cartRouter = express.Router();
const { addToCart, removeFromCart, updateCart } = require("../db/cartItems");
const { isLoggedIn } = require("../middleware/auth");

// POST /api/cart
cartRouter.post("/", isLoggedIn, async (req, res, next) => {
  const { user_id, record_id, quantity, totalCost } = req.body;
  try {
    const cartItem = await addToCart({
      user_id,
      record_id,
      quantity,
      totalCost,
    });
    res.send(cartItem);
  } catch (err) {
    next(err);
  }
});

// PUT /api/cart/:recordId
cartRouter.put("/:recordId", isLoggedIn, async (req, res, next) => {
  const { recordId } = req.params;
  const { quantity, totalCost } = req.body;
  try {
    const cartItem = await updateCart({
      user_id: req.user.id,
      record_id: recordId,
      quantity,
      totalCost,
    });
    res.send(cartItem);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/cart/:recordId
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

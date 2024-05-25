// checkout api route

const express = require("express");
const router = express.Router();

const isLoggedIn = require("../middleware/isLoggedIn");

const { checkout } = require("../db/checkout");

router.post("/checkout", isLoggedIn, async (req, res, next) => {
  try {
    const { userId, cart } = req.body;
    const result = await checkout(userId, cart);

    res.status(200).json({ message: "Checkout successful! :) ", result });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

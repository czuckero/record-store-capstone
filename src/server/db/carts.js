// server/db/cart.js
const db = require("./client");
const uuid = require("uuid");

// Function to create a new cart for a user
const createCart = async ({ user_id }) => {
  try {
    const {
      rows: [cart],
    } = await db.query(
      `--sql
      INSERT INTO carts (id, user_id)
      VALUES ($1, $2)
      RETURNING *;
      `,
      [uuid.v4(), user_id]
    );
    return cart;
  } catch (err) {
    throw err;
  }
};

// Function to get cart by user ID
const getCartByUserId = async (userId) => {
  try {
    const { rows: carts } = await db.query(
      `--sql
      SELECT * FROM carts WHERE user_id = $1`,
      [userId]
    );

    if (carts.length === 0) {
      return null;
    }

    return carts[0];
  } catch (error) {
    throw error;
  }
};

// Function to get cart items by user ID
const getCartItems = async (user_id) => {
  console.log("lincoln");
  try {
    const { rows: cart } = await db.query(
      `--sql
        SELECT * FROM carts
        WHERE user_id=$1;
      `,
      [user_id]
    );

    if (!cart.length) {
      return [];
    }

    const cart_id = cart[0].id;

    const { rows: cartItems } = await db.query(
      //retrieves cart items table with records table
      `--sql
      SELECT cart_items.*, records.*
      FROM cart_items
      JOIN records ON cart_items.record_id = records.id
      WHERE cart_items.cart_id=$1;
      `,
      [cart_id]
    );

    return cartItems;
  } catch (err) {
    throw err;
  }
};

// Function to clear cart by user ID
const clearCart = async (user_id) => {
  try {
    const { rows: cart } = await db.query(
      `--sql
      SELECT id FROM carts WHERE user_id=$1;
      `,
      [user_id]
    );

    if (!cart.length) {
      return { message: "No cart found for user" };
    }

    const cart_id = cart[0].id;

    await db.query(
      `--sql
      DELETE FROM cart_items
      WHERE cart_id=$1;
    `,
      [cart_id]
    );
    return { message: "Cart cleared" };
  } catch (err) {
    throw err;
  }
};

// Function to add item to cart
const addToCart = async ({ user_id, record_id, quantity, price }) => {
  try {
    let cart = await getCartByUserId(user_id);
    if (!cart) {
      cart = await createCart({ user_id });
    }
    const cart_id = cart.id;

    const {
      rows: [cartItem],
    } = await db.query(
      `--sql
      INSERT INTO cart_items (id, cart_id, record_id, quantity, price)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `,
      [uuid.v4(), cart_id, record_id, quantity, price]
    );
    return cartItem;
  } catch (err) {
    throw err;
  }
};

// Function to remove item from cart
const removeFromCart = async ({ user_id, record_id }) => {
  try {
    const cart = await getCartByUserId(user_id);
    if (!cart) {
      throw new Error("Cart not found");
    }
    const cart_id = cart.id;

    const {
      rows: [cartItem],
    } = await db.query(
      `--sql
      DELETE FROM cart_items
      WHERE cart_id=$1 AND record_id=$2
      RETURNING *;
    `,
      [cart_id, record_id]
    );
    return cartItem;
  } catch (err) {
    throw err;
  }
};

// Function to update item in cart
const updateCart = async ({ user_id, record_id, quantity, price }) => {
  try {
    const cart = await getCartByUserId(user_id);
    if (!cart) {
      throw new Error("Cart not found");
    }
    const cart_id = cart.id;

    const {
      rows: [cartItem],
    } = await db.query(
      `--sql
      UPDATE cart_items
      SET quantity=$1, price=$2
      WHERE cart_id=$3 AND record_id=$4
      RETURNING *;
    `,
      [quantity, price, cart_id, record_id]
    );
    return cartItem;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createCart,
  getCartByUserId,
  getCartItems,
  clearCart,
  addToCart,
  removeFromCart,
  updateCart,
};

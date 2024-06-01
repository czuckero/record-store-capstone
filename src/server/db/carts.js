// handles cart-related stuff

const db = require("./client");
const uuid = require("uuid");

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

const getCartItems = async (user_id) => {
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

module.exports = {
  createCart,
  getCartByUserId,
  getCartItems,
  clearCart,
};

// handles cart-related stuff

const db = require("./client");

const addToCart = async ({ user_id, record_id, quantity, totalCost }) => {
  try {
    const {
      rows: [cartItem],
    } = await db.query(
      `--sql
      INSERT INTO cart (user_id, record_id, quantity, totalCost)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `,
      [user_id, record_id, quantity, totalCost]
    );
    return cartItem;
  } catch (err) {
    throw err;
  }
};

const removeFromCart = async ({ user_id, record_id }) => {
  try {
    const {
      rows: [cartItem],
    } = await db.query(
      `--sql
      DELETE FROM cart
      WHERE user_id=$1 AND record_id=$2
      RETURNING *;
    `,
      [user_id, record_id]
    );
    return cartItem;
  } catch (err) {
    throw err;
  }
};

const getCartItems = async (user_id) => {
  try {
    const { rows: cartItems } = await db.query(
      `--sql
      SELECT * FROM cart
      WHERE user_id=$1;
    `,
      [user_id]
    );
    return cartItems;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  getCartItems,
};

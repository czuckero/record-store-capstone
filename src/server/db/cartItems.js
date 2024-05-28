const db = require("./client");

const addToCart = async ({ user_id, record_id, quantity, totalCost }) => {
  try {
    const {
      rows: [cartItem],
    } = await db.query(
      `--sql
      INSERT INTO cart_items (user_id, record_id, quantity, totalCost)
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
      DELETE FROM cart_items
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

const updateCart = async ({ user_id, record_id, quantity, totalCost }) => {
  try {
    const {
      rows: [cartItem],
    } = await db.query(
      `--sql
      UPDATE cart_items
      SET quantity=$1, totalCost=$2
      WHERE user_id=$3 AND record_id=$4
      RETURNING *;
    `,
      [quantity, totalCost, user_id, record_id]
    );
    return cartItem;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  updateCart,
};

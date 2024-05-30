const db = require("./client");
const uuid = require("uuid");

const addToCart = async ({ cart_id, record_id, quantity, totalCost }) => {
  try {
    const {
      rows: [cartItem],
    } = await db.query(
      `--sql
      INSERT INTO cart_items (id, cart_id, record_id, quantity, total_cost)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `,
      [uuid.v4(), cart_id, record_id, quantity, totalCost]
    );
    return cartItem;
  } catch (err) {
    throw err;
  }
};

const removeFromCart = async ({ cart_id, record_id }) => {
  try {
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

const updateCart = async ({ cart_id, record_id, quantity, totalCost }) => {
  try {
    const {
      rows: [cartItem],
    } = await db.query(
      `--sql
      UPDATE cart_items
      SET quantity=$1, total_cost=$2
      WHERE cart_id=$3 AND record_id=$4
      RETURNING *;
    `,
      [quantity, totalCost, cart_id, record_id]
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

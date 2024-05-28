const db = require("./client");

const getCartItems = async (user_id) => {
  try {
    const { rows: cartItems } = await db.query(
      `--sql
        SELECT * FROM cart_items
        WHERE user_id=$1;
      `,
      [user_id]
    );
    return cartItems;
  } catch (err) {
    throw err;
  }
};

const clearCart = async (user_id) => {
  try {
    await db.query(
      `--sql
      DELETE FROM cart_items
      WHERE user_id=$1;
    `,
      [user_id]
    );
    return { message: "Cart cleared" };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getCartItems,
  clearCart,
};

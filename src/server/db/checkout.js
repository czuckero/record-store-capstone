// handles checkout-related stuff

const db = require("./client");

const checkout = async (userId, cart) => {
  try {
    await db.query("BEGIN CHECKOUT");

    for (const item of cart) {
      const { recordId, quantity } = item;
      await updateInventory(recordId, quantity);
    }

    await createOrder(userId, cart);

    await db.query("COMMIT");
    return { success: true, message: "Checkout successful!" };
  } catch (error) {
    await db.query("ERROR");
    throw error;
  }
};

const updateInventory = async (recordId, quantity) => {
  await db.query("UPDATE records SET quantity = quantity - $1 WHERE id = $2", [
    quantity,
    recordId,
  ]);
};

const createOrder = async (userId, cart) => {
  const values = cart
    .map(
      (item) => `(
    '${userId}',
    '${item.recordId}',
    ${item.quantity})`
    )
    .join(",");
  const query = `--sql
  INSERT INTO orders (user_id, record_id, quantity)
  VALUES ${values}
  `;
  await db.query(query);
};

module.exports = {
  checkout,
};

// handles record-related database operations

const db = require("./client");

const createRecord = async ({
  genre = "",
  artist_id,
  title,
  price,
  newRecord = true,
  img = "",
}) => {
  try {
    const {
      rows: [record],
    } = await db.query(
      `--sql
      INSERT INTO records (genre, artist_id, title, price, new, img)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `,
      [genre, artist_id, title, price, newRecord, img]
    );

    return record;
  } catch (err) {
    throw err;
  }
};

const getRecords = async () => {
  try {
    const { rows: records } = await db.query(
      `--sql
      SELECT * FROM records
      `
    );
    return records;
  } catch (error) {
    throw error;
  }
};

const updateStock = async () => {
  try {
    const {
      rows: [record],
    } = await db.query(
      `--sql
      UPDATE records
      SET stock=$1
      WHERE id=$2
      RETURNING *;
      `,
      [newStock, record_id]
    );
    return record;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createRecord,
  getRecords,
  updateStock,
};

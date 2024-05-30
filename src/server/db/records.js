// handles record-related stuff

const db = require("./client");
const uuid = require("uuid");

const createRecord = async ({
  artist = "",
  genre = "",
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
      INSERT INTO records (id, artist, genre, title, price, new, img)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `,
      [uuid.v4(), artist, genre, title, price, newRecord, img]
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
      SELECT * FROM records;
      `
    );
    return records;
  } catch (error) {
    throw error;
  }
};

const updateStock = async (newStock, record_id) => {
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

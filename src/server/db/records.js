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
      SELECT *
      FROM records;
      `
    );
    return records;
  } catch (error) {
    throw error;
  }
};

const getRecordById = async () => {
  try {
    const {
      rows: [record],
    } = await db.query(
      `--sql
      SELECT *
      FROM records
      WHERE id = $1
      `,
      [record_id]
    );
  } catch (error) {
    throw error;
  }
};

const updateRecord = async ({
  id,
  artist,
  genre,
  title,
  price,
  newRecord,
  img,
}) => {
  try {
    const {
      rows: [record],
    } = await db.query(
      `--sql
      UPDATE records
      SET artist = $2,
      genre = $3,
      title = $4,
      price = $5,
      new = $6,
      img = $7
      WHERE id = $1
      RETURNING *
      `,
      [id, artist, genre, title, price, newRecord, img]
    );
    return record;
  } catch (error) {
    throw error;
  }
};

const updateQuantity = async (newQuantity, record_id) => {
  try {
    const {
      rows: [record],
    } = await db.query(
      `--sql
      UPDATE records
      SET quantity=$1
      WHERE id=$2
      RETURNING *;
      `,
      [newQuantity, record_id]
    );
    return record;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createRecord,
  getRecords,
  getRecordById,
  updateRecord,
  updateQuantity,
};

// server/db/genres.js

const db = require("./client");

const getGenres = async () => {
  try {
    const result = await db.query("SELECT * FROM genres");
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const getGenreById = async (id) => {
  try {
    const result = await db.query("SELECT * FROM genres WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getGenres,
  getGenreById,
};

const db = require("./client");
const { createArtist } = require("./artists");
const { createRecord } = require("./records");
const { getUsers } = require("./users");

const createArtistByAdmin = async ({ name, bio, genre, img }) => {
  return await createArtist({ name, bio, genre, img });
};

const createRecordByAdmin = async ({
  genre,
  artist_id,
  title,
  price,
  newRecord,
  img,
}) => {
  return await createRecord({ genre, artist_id, title, price, newRecord, img });
};

const getAllUsers = async () => {
  return await getUsers();
};

module.exports = {
  createArtistByAdmin,
  createRecordByAdmin,
  getAllUsers,
};

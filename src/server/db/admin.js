// handles admin-related stuff

const { createRecord } = require("./records");
const { getUsers } = require("./users");

const createArtistByAdmin = async ({ name, bio, genre, img }) => {
  return await createArtist({ name, bio, genre, img });
};

const createRecordByAdmin = async ({
  genre,
  artist,
  title,
  price,
  newRecord,
  img,
}) => {
  return await createRecord({ genre, artist, title, price, newRecord, img });
};

const getAllUsers = async () => {
  return await getUsers();
};

module.exports = {
  createArtistByAdmin,
  createRecordByAdmin,
  getAllUsers,
};

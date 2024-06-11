// handles admin-related stuff

const { createRecord } = require("./records");
const { getUsers } = require("./users");

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
  createRecordByAdmin,
  getAllUsers,
};

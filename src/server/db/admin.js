// handles admin-related stuff

const { getUsers } = require("./users");

const getAllUsers = async () => {
  return await getUsers();
};

module.exports = {
  getAllUsers,
};

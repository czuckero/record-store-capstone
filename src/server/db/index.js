//export all database operations

module.exports = {
  ...require("./users"),
  ...require("./artists"),
  ...require("./records"),
  ...require("./cart"),
};

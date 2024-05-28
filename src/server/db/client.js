const { Client } = require("pg");
const connectionString =
<<<<<<< HEAD
  process.env.DATABASE_URL || "http://localhost:5432/record-store";
=======
  process.env.DATABASE_URL || "postgres://localhost/record-store";
>>>>>>> bad79e6 (updated carts removed artists and genres)

const db = new Client({
  connectionString,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
});

module.exports = db;

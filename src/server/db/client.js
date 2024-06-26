const pg = require("pg");
const connectionString =
  process.env.DATABASE_URL || "postgres://localhost/record-store";

const db = new pg.Client({
  connectionString,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
});

module.exports = db;

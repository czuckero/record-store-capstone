//seed database with initial data

const db = require("./client");
const { createUser } = require("./users");

const users = [
  {
    username: "czuckero",
    email: "zuck@gmail.com",
    password: "password1",
    admin: true,
  },
  {
    username: "gcurtis",
    email: "gcurtis@gmail.com",
    password: "password2",
    admin: true,
  },
  {
    username: "choang",
    email: "choang@gmail.com",
    password: "password3",
    admin: true,
  },
  {
    username: "lincoln",
    email: "lincoln@gmail.com",
    password: "lincolnrocks",
    admin: false,
  },
];

const dropTables = async () => {
  try {
    await db.query(`--sql
      DROP TABLE IF EXISTS cart;
      DROP TABLE IF EXISTS records;
      DROP TABLE IF EXISTS artists;
      DROP TABLE IF EXISTS users;
    `);
  } catch (err) {
    throw err;
  }
};

const createTables = async () => {
  try {
    await db.query(`--sql
      CREATE TABLE users(
        id UUID PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        admin BOOLEAN DEFAULT false
      );
      CREATE TABLE artists(
        id UUID PRIMARY KEY DEFAULT,
        name VARCHAR(255) NOT NULL,
        bio TEXT,
        genre VARCHAR(255),
        img TEXT
      );
      CREATE TABLE records(
        id UUID PRIMARY KEY,
        genre VARCHAR(255),
        artist_id UUID REFERENCES artists(id),
        title VARCHAR(255) NOT NULL,
        price INTEGER NOT NULL,
        new BOOLEAN DEFAULT true,
        img TEXT
      );
      CREATE TABLE cart(
        id UUID PRIMARY KEY,
        user_id UUID REFERENCES users(id),
        record_id UUID REFERENCES records(id),
        quantity INTEGER DEFAULT 1,
        totalCost INTEGER
      );
    `);
  } catch (err) {
    throw err;
  }
};

const insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser(user);
    }
    console.log("Seed data inserted successfully.");
  } catch (error) {
    console.error("Error inserting seed data:", error);
  }
};

const seedDatabase = async () => {
  try {
    await db.connect();
    await dropTables();
    await createTables();
    await insertUsers();
  } catch (err) {
    throw err;
  } finally {
    await db.end();
  }
};

seedDatabase();

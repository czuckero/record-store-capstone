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
      DROP TABLE IF EXISTS cart_items;
      DROP TABLE IF EXISTS carts;
      DROP TABLE IF EXISTS records;
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
      CREATE TABLE records(
        id UUID PRIMARY KEY,
        genre VARCHAR(255),
        title VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        new BOOLEAN DEFAULT true,
        img TEXT
      );
      CREATE TABLE carts(
        id UUID PRIMARY KEY,
        user_id UUID REFERENCES users(id)
      );
      CREATE TABLE cart_items(
        id UUID PRIMARY KEY,
        carts_id UUID REFERENCES carts(id),
        record_id UUID REFERENCES records(id),
        quantity INTEGER DEFAULT 1
      );
    `);
  } catch (err) {
    throw err;
  }
};

const seedDatabase = async () => {
  try {
    await db.connect();
    await dropTables();
    await createTables();
    await createUsers();
  } catch (err) {
    throw err;
  } finally {
    await db.end();
  }
};

seedDatabase();

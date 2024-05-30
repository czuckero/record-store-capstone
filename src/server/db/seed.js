const { createUser } = require("./users");
const { createRecord } = require("./records");
const { createCart } = require("./carts");
const { addToCart } = require("./cartItems");
const db = require("./client");
const { v4: uuidv4 } = require("uuid");

const users = [
  {
    username: "czuck",
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

const records = [
  {
    artist: "Michael Jackson",
    genre: "Pop/R&B",
    title: "Thriller",
    price: "26.99",
    new: true,
    img: "",
  },
  {
    artist: "Metallica",
    genre: "Rock",
    title: "Metallica",
    price: "35.99",
    new: true,
    img: "",
  },
  {
    artist: "Glass Animals",
    genre: "Indie",
    title: "Dreamland",
    price: "23.99",
    new: true,
    img: "",
  },
  {
    artist: "Kendrick Lamar",
    genre: "Hip-Hop/Rap",
    title: "good kid, m.A.A.d city",
    price: "35.99",
    new: true,
    img: "",
  },
  {
    artist: "Taylor Swift",
    genre: "Pop",
    title: "Midnights",
    price: "24.95",
    new: true,
    img: "",
  },
  {
    artist: "John Coltrane",
    genre: "Jazz",
    title: "Blue Train",
    price: "29.95",
    new: false,
    img: "",
  },
  {
    artist: "D'Angelo",
    genre: "Neo Soul",
    title: "Voodoo",
    price: "54.99",
    new: true,
    img: "",
  },
  {
    artist: "Johnny Cash",
    genre: "Country",
    title: "At Folsom Prison",
    price: "24.99",
    new: false,
    img: "",
  },
  {
    artist: "Leonard Cohen",
    genre: "Folk",
    title: "Songs of Love and Hate",
    price: "24.99",
    new: false,
    img: "",
  },
  {
    artist: "ABBA",
    genre: "Disco",
    title: "Gold",
    price: "38.99",
    new: true,
    img: "",
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
        artist VARCHAR(255),
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
        cart_id UUID REFERENCES carts(id),
        record_id UUID REFERENCES records(id),
        quantity INTEGER DEFAULT 1,
        total_cost DECIMAL(10,2) NOT NULL
      );
    `);
  } catch (err) {
    throw err;
  }
};

const insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser({
        username: user.username,
        email: user.email,
        password: user.password,
        isAdmin: user.admin,
      });
    }
    console.log("Seed user data inserted successfully.");
  } catch (error) {
    console.error("Error inserting seed data:", error);
  }
};

const insertRecords = async () => {
  try {
    for (const record of records) {
      await createRecord({
        artist: record.artist,
        genre: record.genre,
        title: record.title,
        price: record.price,
        new: record.newRecord,
        img: record.img,
      });
    }
    console.log("Seed record data inserted successfully.");
  } catch (error) {
    console.error("Error inserting seed data:", error);
  }
};

const insertCarts = async () => {
  try {
    const { rows: insertedUsers } = await db.query(
      `--sql
      SELECT *
      FROM users;
      `
    );
    for (const user of insertedUsers) {
      await createCart({
        user_id: user.id,
      });
    }
    console.log("Seed cart data inserted successfully.");
  } catch (error) {
    console.error("Error inserting seed data:", error);
  }
};

const insertCartItems = async () => {
  try {
    const { rows: carts } = await db.query(
      `--sql
      SELECT *
      FROM carts;
      `
    );

    const { rows: records } = await db.query(
      `--sql
      SELECT *
      FROM records;
      `
    );
    for (const cart of carts) {
      for (const record of records) {
        await addToCart({
          cart_id: cart.id,
          record_id: record.id,
          quantity: 1,
          totalCost: record.price,
        });
      }
    }
    console.log("Seed cart item data inserted successfully.");
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
    await insertRecords();
    await insertCarts();
    await insertCartItems();
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    await db.end();
  }
};

seedDatabase();

const { createUser } = require("./users");
const { createRecord } = require("./records");
const { createCart, addToCart } = require("./carts");
const db = require("./client");
const { v4: uuidv4 } = require("uuid");

const users = [
  {
    username: "czuck",
    email: "zuck@gmail.com",
    password: "password1",
    is_admin: true,
  },
  {
    username: "gcurtis",
    email: "gcurtis@gmail.com",
    password: "password2",
    is_admin: true,
  },
  {
    username: "choang",
    email: "choang@gmail.com",
    password: "password3",
    is_admin: true,
  },
  {
    username: "lincoln",
    email: "lincoln@gmail.com",
    password: "lincolnrocks",
    is_admin: false,
  },
];

const records = [
  {
    artist: "Michael Jackson",
    genre: "Pop/R&B",
    title: "Thriller",
    price: "26.99",
    description: "(Description)",
    img: "https://m.media-amazon.com/images/M/MV5BODhhZjJlYTktZDQ2MS00Yzk4LWFlOTQtYTgyOGE1ZGE5YWEyL2ltYWdlXkEyXkFqcGdeQXVyMzA5MjgyMjI@._V1_.jpg",
  },
  {
    artist: "Metallica",
    genre: "Rock",
    title: "Metallica",
    price: "35.99",
    description: "(Description)",
    img: "https://i.ebayimg.com/images/g/6vcAAOSwXHpca1W1/s-l1600.jpg",
  },
  {
    artist: "Glass Animals",
    genre: "Indie",
    title: "Dreamland",
    price: "23.99",
    description: "(Description)",
    img: "https://i.scdn.co/image/ab67616d0000b27360d9f3955a8cc8eb67265a38",
  },
  {
    artist: "Kendrick Lamar",
    genre: "Hip-Hop/Rap",
    title: "good kid, m.A.A.d city",
    price: "35.99",
    description: "(Description)",
    img: "https://m.media-amazon.com/images/I/71YMac+JmAL._UF1000,1000_QL80_.jpg",
  },
  {
    artist: "Taylor Swift",
    genre: "Pop",
    title: "Midnights",
    price: "24.95",
    description: "(Description)",
    img: "https://i.scdn.co/image/ab67616d0000b273fa747621a53c8e2cc436dee0",
  },
  {
    artist: "John Coltrane",
    genre: "Jazz",
    title: "Blue Train",
    price: "29.95",
    description: "(Description)",
    img: "https://cdn11.bigcommerce.com/s-w8qmypftv/images/stencil/1280x1280/products/1642082/4036926/NjctNDc5OC5qcGVn__44909.1680473732.jpg?c=2",
  },
  {
    artist: "D'Angelo",
    genre: "Neo Soul",
    title: "Voodoo",
    price: "54.99",
    description: "(Description)",
    img: "https://m.media-amazon.com/images/I/4118ZBDVFVL._UF1000,1000_QL80_.jpg",
  },
  {
    artist: "Johnny Cash",
    genre: "Country",
    title: "At Folsom Prison",
    price: "24.99",
    description: "(Description)",
    img: "https://m.media-amazon.com/images/I/91cgDY8ocrL._UF1000,1000_QL80_.jpg",
  },
  {
    artist: "Leonard Cohen",
    genre: "Folk",
    title: "Songs of Love and Hate",
    price: "24.99",
    description: "(Description)",
    img: "https://cdn-p.smehost.net/sites/81c947ec3e5441a5a09cf933b1bfcf4f/wp-content/uploads/2021/03/LeonardCohen50thHeader.jpg",
  },
  {
    artist: "ABBA",
    genre: "Disco",
    title: "Gold",
    price: "38.99",
    description: "(Description)",
    img: "https://m.media-amazon.com/images/I/91cPxQP9NmL._UF1000,1000_QL80_.jpg",
  },
  {
    artist: "QUEEN",
    genre: "Rock",
    title: "A Night at the Opera",
    price: "38.99",
    description: "(Description)",
    img: "https://i.scdn.co/image/ab67616d0000b2735a0356dd4c5822509208f525",
  },
  {
    artist: "Lana Del Rey",
    genre: "Pop",
    title: "Born To Die",
    price: "24.95",
    description: "(Description)",
    img: "https://m.media-amazon.com/images/I/71v9YKQxm2L._UF1000,1000_QL80_.jpg",
  },
  {
    artist: "Bon Iver",
    genre: "Folk",
    title: "Bon Iver",
    price: "24.95",
    description: "(Description)",
    img: "https://images.genius.com/268e1d3caaaaa96597807788cf81e46d.600x600x1.jpg",
  },
  {
    artist: "Ramones",
    genre: "Punk",
    title: "End of the Century",
    price: "28.99",
    description: "(Description)",
    img: "https://i.discogs.com/tNmlix7kpG5HFFA3kTTO4iHjDvIyAFqIaPIhZDa4leM/rs:fit/g:sm/q:90/h:600/w:599/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEyNDU1/MzczLTE1OTU2ODQ3/MjYtMTg4Mi5qcGVn.jpeg",
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
    console.log("Tables dropped successfully.");
  } catch (err) {
    console.log("Error dropping tables:", err);
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
        is_admin BOOLEAN DEFAULT false
      );
      CREATE TABLE records(
        id UUID PRIMARY KEY,
        artist VARCHAR(255),
        genre VARCHAR(255),
        title VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        description VARCHAR(1000),
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
        price DECIMAL(10,2) NOT NULL
      );
    `);
    console.log("Tables created successfully.");
  } catch (err) {
    console.log("Error creating tables:", err);
    throw err;
  }
};

const insertUsers = async () => {
  try {
    for (const user of users) {
      const insertedUser = await createUser({
        username: user.username,
        email: user.email,
        password: user.password,
        is_admin: user.is_admin,
      });
      console.log(
        `User inserted: ${insertedUser.id} - ${insertedUser.username}`
      );
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
        description: record.description,
        img: record.img,
      });
      console.log(`Record inserted: ${record.title}`);
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
      SELECT * FROM carts WHERE user_id IS NOT NULL;
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
          user_id: cart.user_id,
          record_id: record.id,
          quantity: 1,
          price: record.price,
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

    const { rows: carts } = await db.query(
      `--sql
    SELECT *
    FROM carts;
    `
    );
    if (carts.length > 0) {
      console.log("Carts seeded successfully:", carts);
    } else {
      console.error("No carts found after seeding.");
    }
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    await db.end();
  }
};

seedDatabase();

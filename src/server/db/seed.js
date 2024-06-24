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
    description: "Thriller is the sixth studio album by Michael Jackson, released on November 29, 1982. Produced by Quincy Jones, the album features a mix of pop, rock, funk, and R&B. It includes iconic tracks such as 'Billie Jean,' 'Beat It,' and the title track 'Thriller.' The album holds the record for the best-selling album of all time, with over 70 million copies sold worldwide. It won eight Grammy Awards, including Album of the Year, and its groundbreaking music videos transformed the medium into an art form.",
    img: "https://m.media-amazon.com/images/M/MV5BODhhZjJlYTktZDQ2MS00Yzk4LWFlOTQtYTgyOGE1ZGE5YWEyL2ltYWdlXkEyXkFqcGdeQXVyMzA5MjgyMjI@._V1_.jpg",
  },
  {
    artist: "Metallica",
    genre: "Rock",
    title: "Metallica",
    price: "35.99",
    description: "Metallica's eponymous album, commonly known as 'The Black Album,' was released on August 12, 1991. Produced by Bob Rock, it marked a shift in the band's sound towards a more polished, radio-friendly style. The album features some of Metallica's most well-known tracks, including 'Enter Sandman,' 'The Unforgiven,' and 'Nothing Else Matters.' It was a commercial success, debuting at number one on the Billboard 200 and becoming one of the best-selling albums worldwide.",
    img: "https://i.ebayimg.com/images/g/6vcAAOSwXHpca1W1/s-l1600.jpg",
  },
  {
    artist: "Glass Animals",
    genre: "Indie",
    title: "Dreamland",
    price: "23.99",
    description: "Dreamland is the third studio album by English indie rock band Glass Animals, released on August 7, 2020. The album is a nostalgic exploration of frontman Dave Bayley's memories and personal experiences, blending psychedelic pop and R&B influences. Notable tracks include 'Heat Waves,' which became a viral hit, 'Your Love (Déjà Vu),' and 'Tangerine.' Dreamland received critical acclaim for its innovative sound and emotional depth.",
    img: "https://i.scdn.co/image/ab67616d0000b27360d9f3955a8cc8eb67265a38",
  },
  {
    artist: "Kendrick Lamar",
    genre: "Hip-Hop/Rap",
    title: "good kid, m.A.A.d city",
    price: "35.99",
    description: "Good Kid, M.A.A.D City is the second studio album by American rapper Kendrick Lamar, released on October 22, 2012. The album is a concept piece that follows Lamar's experiences growing up in Compton, California. It features a mix of introspective lyrics and storytelling, with standout tracks like 'Bitch, Don’t Kill My Vibe,' 'Swimming Pools (Drank),' and 'm.A.A.d city.' The album received widespread acclaim and solidified Lamar's status as one of hip-hop's most important voices.",
    img: "https://m.media-amazon.com/images/I/71YMac+JmAL._UF1000,1000_QL80_.jpg",
  },
  {
    artist: "Taylor Swift",
    genre: "Pop",
    title: "Midnights",
    price: "24.95",
    description: "Midnights is the tenth studio album by American singer-songwriter Taylor Swift, released on October 21, 2022. The album explores themes of introspection, nostalgia, and the complexities of human emotions, with a blend of synth-pop and electronic influences. Key tracks include 'Anti-Hero,' 'Lavender Haze,' and 'Midnight Rain.' Midnights was met with positive reviews and commercial success, debuting at number one on the Billboard 200.",
    img: "https://i.scdn.co/image/ab67616d0000b273fa747621a53c8e2cc436dee0",
  },
  {
    artist: "John Coltrane",
    genre: "Jazz",
    title: "Blue Train",
    price: "29.95",
    description: "Blue Train is a 1958 album by American jazz saxophonist John Coltrane, released by Blue Note Records. The album is considered one of Coltrane's masterpieces and a seminal work in the hard bop genre. It features a sextet including trumpeter Lee Morgan and trombonist Curtis Fuller. Notable tracks include 'Blue Train,' 'Moment's Notice,' and 'Locomotion.' Blue Train showcases Coltrane's innovative style and has been highly influential in the jazz world.",
    img: "https://cdn11.bigcommerce.com/s-w8qmypftv/images/stencil/1280x1280/products/1642082/4036926/NjctNDc5OC5qcGVn__44909.1680473732.jpg?c=2",
  },
  {
    artist: "D'Angelo",
    genre: "Neo Soul",
    title: "Voodoo",
    price: "54.99",
    description: "Voodoo is the second studio album by American singer D'Angelo, released on January 25, 2000. The album is a landmark in the neo-soul genre, blending elements of R&B, jazz, funk, and hip-hop. Produced by D'Angelo and Questlove, it features contributions from artists like Raphael Saadiq and Roy Hargrove. Key tracks include 'Untitled (How Does It Feel),' 'Devil's Pie,' and 'Send It On.' Voodoo received critical acclaim and won the Grammy Award for Best R&B Album.",
    img: "https://m.media-amazon.com/images/I/4118ZBDVFVL._UF1000,1000_QL80_.jpg",
  },
  {
    artist: "Johnny Cash",
    genre: "Country",
    title: "At Folsom Prison",
    price: "24.99",
    description: "At Folsom Prison is a live album by American singer-songwriter Johnny Cash, released on May 6, 1968. Recorded during two concerts at Folsom State Prison in California, the album captures Cash's raw energy and connection with the audience. It includes classic tracks like 'Folsom Prison Blues,' 'I Still Miss Someone,' and 'Cocaine Blues.' The album was a critical and commercial success, revitalizing Cash's career and becoming one of the greatest live recordings in music history.",
    img: "https://m.media-amazon.com/images/I/91cgDY8ocrL._UF1000,1000_QL80_.jpg",
  },
  {
    artist: "Leonard Cohen",
    genre: "Folk",
    title: "Songs of Love and Hate",
    price: "24.99",
    description: "Songs of Love and Hate is the third studio album by Canadian singer-songwriter Leonard Cohen, released on March 19, 1971. The album features some of Cohen's darkest and most introspective work, with songs that explore themes of love, loss, and despair. Notable tracks include 'Avalanche,' 'Famous Blue Raincoat,' and 'Joan of Arc.' The album received critical acclaim for its lyrical depth and haunting melodies, solidifying Cohen's reputation as a master songwriter.",
    img: "https://cdn-p.smehost.net/sites/81c947ec3e5441a5a09cf933b1bfcf4f/wp-content/uploads/2021/03/LeonardCohen50thHeader.jpg",
  },
  {
    artist: "ABBA",
    genre: "Disco",
    title: "Gold",
    price: "38.99",
    description: "Gold: Greatest Hits is a compilation album by Swedish pop group ABBA, released on September 21, 1992. The album includes many of ABBA's most popular songs, such as 'Dancing Queen,' 'Mamma Mia,' 'Take a Chance on Me,' and 'Waterloo.' It has been a major commercial success, becoming one of the best-selling albums worldwide. Gold showcases the group's catchy melodies and harmonies, making it a definitive collection of their greatest hits.",
    img: "https://m.media-amazon.com/images/I/91cPxQP9NmL._UF1000,1000_QL80_.jpg",
  },
  {
    artist: "QUEEN",
    genre: "Rock",
    title: "A Night at the Opera",
    price: "38.99",
    description: "A Night at the Opera is the fourth studio album by British rock band Queen, released on November 21, 1975. The album features a diverse range of musical styles, from hard rock to ballads. It includes the iconic track 'Bohemian Rhapsody,' which became one of the most famous rock songs of all time. Other notable tracks include 'You're My Best Friend' and 'Love of My Life.' The album was a critical and commercial success, solidifying Queen's status as rock legends.",
    img: "https://i.scdn.co/image/ab67616d0000b2735a0356dd4c5822509208f525",
  },
  {
    artist: "Lana Del Rey",
    genre: "Pop",
    title: "Born To Die",
    price: "24.95",
    description: "Born To Die is the debut major-label studio album by Lana Del Rey, released on January 27, 2012. The album features a unique blend of alternative pop, baroque pop, and trip-hop, characterized by Del Rey's sultry and melancholic vocals. Key tracks include 'Video Games,' 'Born to Die,' and 'Summertime Sadness,' with the latter becoming her highest-charting single in the US. The album's themes revolve around love, heartbreak, and the glamorous yet dark aspects of fame and life. Despite mixed initial reviews, it has gained retrospective acclaim and helped establish Del Rey's cult status in the music industry.",
    img: "https://m.media-amazon.com/images/I/71v9YKQxm2L._UF1000,1000_QL80_.jpg",
  },
  {
    artist: "Bon Iver",
    genre: "Folk",
    title: "Bon Iver",
    price: "24.95",
    description: "Bon Iver is the self-titled second studio album by American indie folk band Bon Iver, released on June 17, 2011. The album marks a departure from the sparse, acoustic sound of their debut, 'For Emma, Forever Ago,' incorporating more diverse instrumentation and intricate arrangements. Notable tracks include 'Holocene,' 'Calgary,' and 'Beth/Rest.' The album received widespread critical acclaim for its lush production and emotional depth, winning the Grammy Awards for Best New Artist and Best Alternative Music Album in 2012.",
    img: "https://images.genius.com/268e1d3caaaaa96597807788cf81e46d.600x600x1.jpg",
  },
  {
    artist: "Ramones",
    genre: "Punk",
    title: "End of the Century",
    price: "28.99",
    description: "End of the Century is the fifth studio album by the American punk rock band Ramones, released on February 4, 1980. Produced by Phil Spector, the album features a more polished sound compared to their earlier work, blending their raw punk energy with Spector's famous Wall of Sound production. Key tracks include 'Do You Remember Rock 'n' Roll Radio?,' 'Chinese Rock,' and their cover of 'Baby, I Love You.' Despite mixed reviews at the time of release, the album is now regarded as a classic and an important part of the band's discography.",
    img: "https://i.discogs.com/tNmlix7kpG5HFFA3kTTO4iHjDvIyAFqIaPIhZDa4leM/rs:fit/g:sm/q:90/h:600/w:599/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEyNDU1/MzczLTE1OTU2ODQ3/MjYtMTg4Mi5qcGVn.jpeg",
  },
  {
    artist: "Bjork",
    genre: "Art Pop",
    title: "Post",
    price: "29.99",
    description: "Post is the second solo studio album by Icelandic artist Björk, released on June 13, 1995. The album is known for its eclectic mix of electronic, trip-hop, and experimental music, showcasing Björk's innovative approach to songwriting and production. Notable tracks include 'Army of Me,' 'Hyperballad,' and 'It's Oh So Quiet.' Post received critical acclaim for its bold, adventurous sound and has since been considered one of Björk's best works, influencing a wide range of artists across various genres.",
    img: "https://f4.bcbits.com/img/a4040590719_65",
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

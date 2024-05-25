const db = require("./client");

const createArtist = async ({ name, bio, genre, img }) => {
  const {
    rows: [artist],
  } = await client.query(
    `--sql
    INSERT INTO artists (name, bio, genre, img)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `,
    [name, bio, genre, img]
  );

  return artist;
};

module.exports = {
  createArtist,
};

const express = require("express");
const adminRouter = express.Router();
const {
  createArtistByAdmin,
  createRecordByAdmin,
  getAllUsers,
} = require("./admin");

adminRouter.post("/artists", async (req, res, next) => {
  try {
    const { name, bio, genre, img } = req.body;
    const artist = await createArtistByAdmin({ name, bio, genre, img });
    res.json(artist);
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/records", async (req, res, next) => {
  try {
    const { genre, artist_id, title, price, newRecord, img } = req.body;
    const record = await createRecordByAdmin({
      genre,
      artist_id,
      title,
      price,
      newRecord,
      img,
    });
    res.json(record);
  } catch (error) {
    next(error);
  }
});

adminRouter.get("/users", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = adminRouter;

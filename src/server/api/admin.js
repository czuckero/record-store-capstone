const express = require("express");
const adminRouter = express.Router();
const {
  createArtistByAdmin,
  createRecordByAdmin,
  getAllUsers,
} = require("./admin");

const { isAdmin } = require("../middleware/auth");

//GET /api/users/:id (admin only)
adminRouter.get("/users", isAdmin, async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// POST /api/artist/:id (admin only)
adminRouter.post("/artists", isAdmin, async (req, res, next) => {
  try {
    const { name, bio, genre, img } = req.body;
    const artist = await createArtistByAdmin({ name, bio, genre, img });
    res.json(artist);
  } catch (error) {
    next(error);
  }
});

// POST /api/records/:id (admin only)
adminRouter.post("/records", isAdmin, async (req, res, next) => {
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

module.exports = adminRouter;

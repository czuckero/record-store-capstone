// artist api routes

const express = require("express");
const artistsRouter = express.Router();
const { getArtists, getArtistById } = require("../db/artists");

// GET /api/artists
artistsRouter.get("/", async (req, res, next) => {
  try {
    const artists = await getArtists();
    res.send(artists);
  } catch (err) {
    next(err);
  }
});

// GET /api/artists/:id
artistsRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const artist = await getArtistById(id);
    res.send(artist);
  } catch (err) {
    next(err);
  }
});

module.exports = artistsRouter;

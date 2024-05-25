// genre api routes

const express = require("express");
const genresRouter = express.Router();
const { getGenres, getGenreById } = require("../db/genres");

// GET /api/genres
genresRouter.get("/", async (req, res, next) => {
  try {
    const genres = await getGenres();
    res.send(genres);
  } catch (err) {
    next(err);
  }
});

// GET /api/genre/:id
genresRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const genre = await getGenreById(id);
    res.send(genre);
  } catch (err) {
    next(err);
  }
});

module.exports = genresRouter;

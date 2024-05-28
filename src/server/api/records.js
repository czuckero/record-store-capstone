// records api routes

const express = require("express");
const recordsRouter = express.Router();
const {
  getRecords,
  getRecordById,
  getRecordsByArtistId,
} = require("../db/records");

//GET /api/records
recordsRouter.get("/", async (req, res, next) => {
  try {
    const records = await getRecords();
    res.send(records);
  } catch (err) {
    next(err);
  }
});

//GET /api/records/:id
recordsRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const record = await getRecordById(id);
    res.send(record);
  } catch (err) {
    next(err);
  }
});

//GET /api/artists/records/:artists:id
recordsRouter.get("/artists/:artistId", async (req, res, next) => {
  const { artistId } = req.params;
  try {
    const records = await getRecordsByArtistId(artistId);
    res.send(records);
  } catch (err) {
    next(err);
  }
});

module.exports = recordsRouter;

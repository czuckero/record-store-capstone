// records api routes

const express = require("express");
const recordsRouter = express.Router();
const {
  getRecords,
  getRecordById,
  getRecordsByArtistId,
} = require("../db/records");

//GET /api/records
recordsRouter.get("/records", async (req, res, next) => {
  try {
    const records = await getRecords();
    res.send(records);
  } catch (err) {
    next(err);
  }
});

//GET /api/records/:id
recordsRouter.get("/records/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const record = await getRecordById(id);
    res.send(record);
  } catch (err) {
    next(err);
  }
});

module.exports = recordsRouter;

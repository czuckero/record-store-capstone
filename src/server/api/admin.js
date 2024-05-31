// admin router

const express = require("express");
const adminRouter = express.Router();
const db = require("../db");

const { isAdmin } = require("../middleware/auth");

adminRouter.get("/users", isAdmin, async (req, res, next) => {
  try {
    const users = await db.users.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/records", isAdmin, async (req, res, next) => {
  try {
    const { genre, artist_id, title, price, newRecord, img } = req.body;
    const record = await db.records.createRecordByAdmin({
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

adminRouter.delete("/records/:recordId", isAdmin, async (req, res, next) => {
  try {
    const recordId = req.params.recordId;
    
    await db.records.deleteRecordById(recordId);

    res.json({ message: "Record deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = adminRouter;

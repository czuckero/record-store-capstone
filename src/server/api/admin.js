// admin router
// only admin can view list of all users, create new records, and delete records

const express = require("express");
const adminRouter = express.Router();
const db = require("../db");
const { createRecord } = require("../db/records");
const { getAllUsers } = require("../db/admin");
const { isLoggedIn, isAdmin } = require("../middleware/auth");

//pie

// GET /api/admin (admin only)
// admin can view a list of users
adminRouter.get("/", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    console.log("viewing all users");
    const users = await getAllUsers();
    console.log("Fetched all users: ", users);
    res.status(200).json(users);
  } catch (error) {
    console.error("Unable to retrieve users:", error);
    res
      .status(500)
      .json({ message: "Unable to retrieve users", error: error.message });
  }
});

// POST /api/admin/records (admin only)
// admin can create a record
adminRouter.post("/records", isAdmin, async (req, res, next) => {
  const { genre, artist, title, price, newRecord, img } = req.body;
  try {
    const record = await createRecord({
      genre,
      artist,
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

// PUT /api/admin/records (admin only)
adminRouter.put("/records/:recordId", isAdmin, async (req, res, next) => {
  const recordId = req.params.recordId;
  const { genre, artist, title, price, newRecord, img } = req.body;
  try {
    const updatedRecord = await db.records.updateRecord({
      id: recordId,
      genre,
      artist,
      title,
      price,
      newRecord,
      img,
    });
    res.json(updatedRecord);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/admin/records/:recordId (admin only)
// admin can delete a record by id
adminRouter.delete("/records/:recordId", isAdmin, async (req, res, next) => {
  try {
    await db.records.deleteRecordById(req.params.recordId);
    res.json({ message: "Record deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = adminRouter;

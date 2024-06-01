// admin router
// only admin can view list of all users, create new records, and delete records

const express = require("express");
const adminRouter = express.Router();
const db = require("../db");
const { createRecord } = require("../db/records");
const { isAdmin } = require("../middleware/auth");

// GET /api/users (admin only)
// admin can view a list of users
adminRouter.get("/users", isAdmin, async (req, res, next) => {
  try {
    const users = await db.users.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// GET /api/users/:id (admin only)
// admin can view a single user
adminRouter.get("/users/:userId", isAdmin, async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await db.users.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// POST /api/records (admin only)
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

// PUT /api/records (admin only)
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

// DELETE /api/records/:recordId (admin only)
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

// admin router
// only admin can view list of all users, create new records, and delete records

const express = require("express");
const adminRouter = express.Router();
const db = require("../db");
const {
  createRecord,
  updateRecord,
  deleteRecordById,
} = require("../db/records");
const { getAllUsers } = require("../db/admin");
const { isLoggedIn, isAdmin } = require("../middleware/auth");

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
  const { genre, artist, title, price, description, img } = req.body;
  try {
    const record = await createRecord({
      genre,
      artist,
      title,
      price,
      description,
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
  const { genre, artist, title, price, description, img } = req.body;
  try {
    console.log(`Updating record with ID: ${recordId}`);
    console.log("Received data:", req.body);
    const updatedRecord = await updateRecord({
      id: recordId,
      genre,
      artist,
      title,
      price,
      description,
      img,
    });
    console.log("Updated record:", updatedRecord);
    res.json(updatedRecord);
  } catch (error) {
    console.error("Error updating record:", error);
    next(error);
  }
});

// DELETE /api/admin/records/:recordId (admin only)
// admin can delete a record by id
adminRouter.delete("/records/:recordId", isAdmin, async (req, res, next) => {
  try {
    const recordId = req.params.recordId;
    console.log(`Deleting record with ID: ${recordId}`);
    await deleteRecordById(recordId);
    res.json({ message: "Record deleted successfully" });
  } catch (error) {
    console.error("Error deleting record:", error);
    res
      .status(500)
      .json({ message: "Error deleting record", error: error.message });
  }
});

module.exports = adminRouter;

const express = require("express");
const { nextTick } = require("process");
const router = express.Router();
const Hotel = require("../models/Hotel");
const createError = require("../utils/error");
const {
  createRoom,
  updateRoom,
  getRoom,
  getRooms,
  deleteRoom,
  updateRoomAvailability,
} = require("../controllers/roomController");
const { verifyAdmin } = require("../utils/verifyToken");

//CREATE
router.post("/:hotelId", verifyAdmin, createRoom);
//READ

//get
router.get("/:id", getRoom);
//getAll
router.get("/", getRooms);

//update
router.patch("/:id", verifyAdmin, updateRoom);
router.put("/availability/:id", updateRoomAvailability);

//delete
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom);

module.exports = router;

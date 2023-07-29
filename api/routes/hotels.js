const express = require("express");
const router = express.Router();
const {
  createHotel,
  updateHotel,
  getHotel,
  getHotels,
  deleteHotel,
  countByCity,
  countByType,
  getHotelRooms,
} = require("../controllers/hotelController");
const { verifyAdmin } = require("../utils/verifyToken");

//CREATE
router.post("/", verifyAdmin, createHotel);
//READ

//get
router.get("/find/:id", getHotel);
//getAll
router.get("/", getHotels);
//countByCity
router.get("/countByCity", countByCity);
//countByType
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

//update
router.patch("/:id", verifyAdmin, updateHotel);

//delete
router.delete("/:id", verifyAdmin, deleteHotel);

module.exports = router;

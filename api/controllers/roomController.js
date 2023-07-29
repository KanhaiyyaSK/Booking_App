const Room = require("./../models/Rooms");
const createError = require("./../utils/error");
const Hotel = require("./../models/Hotel");

exports.createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }

    res.status(200).json({
      status: "success",
      savedRoom,
    });
  } catch (err) {
    next(err);
  }
};
exports.updateRoom = async (req, res, next) => {
  try {
    const saveRoom = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      hotel: {
        saveRoom,
      },
    });
  } catch (err) {
    next(err);
  }
};
exports.updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    ),
      res.status(200).json("Room status has been updated");
  } catch (err) {
    next(err);
  }
};
exports.getRoom = async (req, res, next) => {
  try {
    const newRoom = await Hotel.findById(req.params.id);

    res.status(200).json({
      message: "success",
      data: {
        newRoom,
      },
    });
  } catch (err) {
    next(err);
  }
};
exports.getRooms = async (req, res, next) => {
  try {
    const rooms = await Hotel.find();

    res.status(200).json({
      message: "success",
      data: {
        rooms,
      },
    });
  } catch (err) {
    next(err);
  }
};
exports.deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  try {
    await Room.findByIdAndDelete(req.params.id);

    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }

    res.status(200).json({
      message: "Hotel has been deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

const Hotel = require("./../models/Hotel");
const Room = require("./../models/Rooms");
exports.createHotel = async (req, res, next) => {
  try {
    const saveHotel = await Hotel.create(req.body);
    // const saveHotel = await newHotel.create(req.body);
    res.status(200).json({
      status: "success",
      hotel: {
        saveHotel,
      },
    });
  } catch (err) {
    next(err);
  }
};
exports.updateHotel = async (req, res, next) => {
  try {
    const saveHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(saveHotel);
  } catch (err) {
    next(err);
  }
};
exports.getHotel = async (req, res, next) => {
  try {
    const newHotel = await Hotel.findById(req.params.id);

    res.status(200).json(newHotel);
  } catch (err) {
    next(err);
  }
};
exports.getHotels = async (req, res, next) => {
  const { min, max } = req.query;
  console.log(req.query.limit);
  try {
    const hotels = await Hotel.find({
      cheapestPrice: { $gt: min || 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

exports.countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
// exports.countByType = async (req, res, next) => {
//   const cities = req.query.types.split(",");
//   try {
//     const list = await Promise.all(
//       cities.map((type) => {
//         return Hotel.countDocuments({ types: type });
//       })
//     );
//     res.status(200).json(list);
//   } catch (err) {
//     next(err);
//   }
// };
exports.countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "Hotel", count: hotelCount },
      { type: "Apartments", count: apartmentCount },
      { type: "Resorts", count: resortCount },
      { type: "Villas", count: villaCount },
      { type: "Cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

exports.deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Hotel has been deleted successfully",
    });

    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

exports.getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    console.log(hotel);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );

    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

const User = require("./../models/User");

exports.updateUser = async (req, res, next) => {
  try {
    const saveUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      hotel: {
        saveUser,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const newUser = await User.findById(req.params.id);
    console.log(newUser);
    res.status(200).json({
      message: "success",
      data: {
        newUser,
      },
    });
  } catch (err) {
    next(err);
  }
};
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      message: "All userrs are",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    next(err);
  }
};
exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Hotel has been deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

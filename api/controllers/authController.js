const User = require("./../models/User");
const bcrypt = require("bcryptjs");
const createError = require("./../utils/error");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync("B4c0//", salt);

    const newUser = await User.create({
      username: req.body.username,
      password: hash,
      email: req.body.email,
    });
    //remove the password from the output
    newUser.password = undefined;

    res.status(201).json({
      status: "success",
      newUser,
    });
  } catch (err) {
    next(err);
  }
};
exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    if (!user) {
      return next(createError(404, "User is not found!"));
    }
    const isPasswordCorrect = bcrypt.compare(req.body.password, user.password); // true

    if (!isPasswordCorrect) {
      return next(createError(400, "wrong password or username!"));
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET_KEY
    );

    res
      .cookie("access_toke", token, {
        httpOnly: true,
      })
      .status(201)
      .json({
        status: "success",
        user,
        token,
      });
  } catch (err) {
    next(err);
  }
};

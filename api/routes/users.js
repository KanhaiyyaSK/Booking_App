const express = require("express");
const { nextTick } = require("process");
const router = express.Router();
const User = require("./../models/User");
const createError = require("../utils/error");
const {
  updateUser,
  getUser,
  getUsers,
  deleteUser,
} = require("../controllers/userController");
const {
  verifyUser,
  verifyAdmin,
} = require("../utils/verifyToken");

//authentication
// router.get("/Checkauthentication", verifyToken, (req, res, next) => {
//   res.send("Hello user, you are logged in!");
// });
// router.get("/checkUser/:id", verifyUser, (req, res, next) => {
//   res.send("Fuck");
// });

// router.get("/checkAdmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("Hello admin, you are logged in and you can delete all accounts");
// });

//READ

//get
router.get("/", verifyUser, getUsers);

//getAll
router.get("/:id", verifyAdmin, getUser);

//update
router.patch("/:id", verifyUser, updateUser);

//delete
router.delete("/:id", verifyUser, deleteUser);

module.exports = router;

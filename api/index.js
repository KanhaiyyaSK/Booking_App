const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const hotelsRoute = require("./routes/hotels");
const roomsRoute = require("./routes/rooms");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

//Development logging
app.use(morgan("dev"));

mongoose.set("strictQuery", false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw error;
  } 
};

// mongoose.connectison.on("disconnected", () => {
//   console.log("mongoDB disconnected!");
// });

// mongoose.connection.on("connected", () => {
//   console.log("mongoDB connected!");
// });

//middlewares
app.use(cookieParser());
app.use(express.json());

// route middlewares
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

// global error handlers
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).json({
    status: errorStatus,
    error: errorMessage,
    message: err.message,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  connect();
  console.log("listening on 8800");
});

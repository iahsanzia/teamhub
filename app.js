const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const errorHandler = require("./middlewares/errorMiddleware");

const app = express();

//Security Middleware
app.use(helmet());

//Enable CORS
app.use(cors());

//Logging
app.use(morgan("dev"));

//BODY PARSER
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "App Running",
  });
});

app.use(errorHandler);

module.exports = app;

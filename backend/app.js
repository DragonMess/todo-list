var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bodyparser = require("body-parser");
const db = require("../backend/db");
db.connect();
const dbHelpers = require("./helpers/dbHelpers.js")(db);

const todosRouter = require("../backend/routes/todos");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routing
app.use("/todos", todosRouter(dbHelpers));
// app.use("/users", usersRouter);

app.get("/", (req, res) => {
  console.log(todosRouter);
  res.send("GET request to the homepage");
});

module.exports = app;

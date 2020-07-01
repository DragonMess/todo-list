var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bodyparser = require("body-parser");
require("dotenv").config();
const db = require("../backend/db");
db.connect();
const dbHelpers = require("./helpers/dbHelpers.js")(db);

const todosRouter = require("../backend/routes/todos");
const { token } = require("morgan");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>
function verifyToken(req, res, next) {
  // Get auth header value
  const authHeader = req.headers["authorization"];
  // Check if bearer is undefined
  // Split at the space && get value index 1
  const bearerToken = authHeader && authHeader.split(" ")[1];
  // Check if bearerToken is null
  if (bearerToken == null) {
    return res.sendStatus(401);
  }
  jwt.verify(bearerToken, process.env.Acces_Token_Secret, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    // set the token
    req.token = bearerToken;
    next();
  });
}
// Routing
app.use("/todos", verifyToken, todosRouter(dbHelpers));
// app.use("/users", usersRouter);
app.post("/login", (req, res) => {
  // mock user
  console.log(req.body);
  const user = {
    email: req.body.email,
    password: req.body.password,
  };
  jwt.sign(user, process.env.Acces_Token_Secret, (err, token) => {
    res.json({ token: token });
    console.log(res.headers);
  });
});

app.get("/", verifyToken, (req, res) => {
  res.send("GET request to the homepage");
});

module.exports = app;

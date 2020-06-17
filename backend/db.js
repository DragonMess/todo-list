// Setting connection with dband use dotenv
require("dotenv").config();
const { Pool } = require("pg");
const db = new Pool({
  host: "localhost",
  database: "todolist",
  user: "labber",
  password: "labber",
  port: 5433,
});
module.exports = db;

// const db = new Pool({
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   port: process.env.DB_PORT,
// });

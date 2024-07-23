require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: "db_user",
  password: "ththth",
  host: "localhost",
  port: 5432,
  database: "merch",
});

module.exports = { pool };

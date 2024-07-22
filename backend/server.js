require("dotenv").config();

const path = require("path");
const express = require("express");
const { connectDB } = require("./src/database/database");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100000,
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();

app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const user = require("./src/routers/user");
const product = require("./src/routers/product");
const { createProduct } = require("./src/controllers/product");

app.use("/", user, product);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

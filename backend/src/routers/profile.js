const express = require("express");
const router = express.Router();
const { getAllProfiles } = require("../controllers/profile");

router.get("/profile", getAllProfiles);

module.exports = router;

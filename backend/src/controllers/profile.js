const express = require("express");
const { pool } = require("../database/database");

const getAllProfiles = async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM public.profiles");
    res.json(data.rows);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "fetch error" });
  }
};

module.exports = {
  getAllProfiles,
};

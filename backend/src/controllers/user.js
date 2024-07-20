const express = require("express");
const { pool } = require("../database/database");

const getAllUsers = async (req, res) => {
  try {
    const data = await pool.query(
      "SELECT * FROM public.users ORDER BY date_joined "
    );
    res.json(data.rows);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "fetch error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const { uuid } = req.body;
    const data = await pool.query(
      "SELECT * FROM public.users WHERE uuid = $1 LIMIT 1",
      [uuid]
    );
    res.json(data.rows);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "fetch error" });
  }
};

const createUserAccount = async (req, res) => {
  try {
    const { email, password, username, address, contact } = req.body;
    const data = await pool.query(
      "INSERT INTO users(email, password, username, address, contact) VALUES ($1, $2, $3, $4, $5)",
      [email, password, username, address, contact]
    );
    res.json({ status: "success", msg: "user created" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "create error" });
  }
};

// modify to make parameters optional
const updateUserById = async (req, res) => {
  try {
    const { uuid, username, address, contact } = req.body;
    const data = await pool.query(
      "UPDATE users SET username = $2, address = $3, contact= $4 WHERE uuid = $1",
      [uuid, username, address, contact]
    );
    res.json({ status: "success", msg: "profile updated" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "update error" });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const { uuid } = req.body;
    const data = await pool.query("DELETE FROM users WHERE uuid = $1", [uuid]);
    res.json({ status: "success", msg: "profile deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "update error" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUserAccount,
  updateUserById,
  deleteUserById,
};

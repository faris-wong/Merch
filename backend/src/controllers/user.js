const express = require("express");
const { pool } = require("../database/database");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

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
    const { email, password, username, role, address, contact } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const data = await pool.query(
      "INSERT INTO users(email, password, username, role, address, contact) VALUES ($1, $2, $3, $4, $5, $6)",
      [email, hash, username, role, address, contact]
    );
    res.json({ status: "success", msg: "user created" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "create error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const auth = await pool.query(
      "SELECT * FROM public.users WHERE email = $1",
      [email]
    );
    if (auth.rows.length === 0) {
      return res.status(401).json({ status: "error", msg: "wrong email" });
    }

    const user = auth.rows[0];
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      return res.status(401).json({ status: "error", msg: "wrong password" });
    }
    const claims = {
      email: user.email,
      role: user.role,
    };
    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });
    const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });
    res.json({ uuid: user.uuid, access, refresh });
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "unable to login" });
  }
};

const updateUserById = async (req, res) => {
  try {
    const { uuid, username, address, contact } = req.body;
    const updates = [];
    const values = [uuid];
    let query = "UPDATE users SET";

    if (username) {
      values.push(username);
      updates.push(` username = $${values.length}`);
    }
    if (address) {
      values.push(address);
      updates.push(` address = $${values.length}`);
    }
    if (contact) {
      values.push(contact);
      updates.push(` contact = $${values.length}`);
    }

    query += updates.join(",") + " WHERE uuid = $1 RETURNING *";

    const data = await pool.query(query, values);

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
  login,
  updateUserById,
  deleteUserById,
};

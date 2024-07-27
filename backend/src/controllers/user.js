const express = require("express");
const { pool } = require("../database/database");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res) => {
  const client = await pool.connect();
  try {
    const data = await client.query(
      "SELECT * FROM public.users ORDER BY date_joined "
    );
    res.json(data.rows);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "fetch error" });
  } finally {
    client.release();
  }
};

const getUserById = async (req, res) => {
  const client = await pool.connect();
  try {
    const data = await client.query(
      "SELECT * FROM public.users WHERE uuid = $1 LIMIT 1",
      [req.decoded.uuid]
    );
    res.json(data.rows);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "fetch error" });
  } finally {
    client.release();
  }
};

const createUserAccount = async (req, res) => {
  const client = await pool.connect();
  try {
    const { email, password, username, role, address, contact } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const data = await client.query(
      "INSERT INTO users(email, password, username, role, address, contact) VALUES ($1, $2, $3, $4, $5, $6)",
      [email, hash, username, role, address, contact]
    );
    res.json({ status: "success", msg: "user created" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "create error" });
  } finally {
    client.release();
  }
};

const login = async (req, res) => {
  const client = await pool.connect();
  try {
    const { email, password } = req.body;
    const auth = await client.query(
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
      username: user.username,
      role: user.role,
      uuid: user.uuid,
    };
    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });
    const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });
    res.json({
      username: user.username,
      uuid: user.uuid,
      role: user.role,
      access,
      refresh,
    });
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "unable to login" });
  } finally {
    client.release();
  }
};

const updateUserById = async (req, res) => {
  const client = await pool.connect();

  try {
    const { username, address, contact } = req.body;

    const updates = [];
    const values = [req.decoded.uuid];
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

    const data = await client.query(query, values);

    res.json({ status: "success", msg: "profile updated" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "update error" });
  } finally {
    client.release();
  }
};

const deleteUserById = async (req, res) => {
  const client = await pool.connect();
  try {
    const { uuid } = req.body;
    const data = await client.query("DELETE FROM users WHERE uuid = $1", [
      uuid,
    ]);
    res.json({ status: "success", msg: "profile deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "update error" });
  } finally {
    client.release();
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

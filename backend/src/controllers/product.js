const express = require("express");
const { pool } = require("../database/database");

getAllProducts = async (req, res) => {
  try {
    const data = await pool.query(
      "SELECT * FROM public.products ORDER BY date_listed "
    );
    res.json(data.rows);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "fetch error" });
  }
};

createProduct = async (req, res) => {
  try {
    const { productname, description, price, sellerid } = req.body;
    const data = await pool.query(
      "INSERT INTO products(product_name, description, price, seller_uuid) VALUES ($1, $2, $3, $4)",
      [productname, description, price, sellerid]
    );
    res.json({ status: "success", msg: "product created" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "create error" });
  }
};

module.exports = { getAllProducts, createProduct };

const express = require("express");
const { pool } = require("../database/database");

getAllProducts = async (req, res) => {
  const client = await pool.connect();
  try {
    const data = await client.query(
      "SELECT * FROM public.products ORDER BY date_listed "
    );
    res.json(data.rows);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "fetch error" });
  }
};

getAllProductListingsBySellerId = async (req, res) => {
  const client = await pool.connect();
  try {
    const { sellerid } = req.body;
    const data = await client.query(
      "SELECT * FROM public.products WHERE seller_uuid = $1 AND purchased = false ORDER BY date_listed",
      [sellerid]
    );
    res.json(data.rows);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "fetch error" });
  }
};

createProduct = async (req, res) => {
  const client = await pool.connect();
  try {
    const { productname, description, price, sellerid } = req.body;
    const data = await client.query(
      "INSERT INTO products(product_name, description, price, seller_uuid) VALUES ($1, $2, $3, $4)",
      [productname, description, price, sellerid]
    );
    res.json({ status: "success", msg: "product created" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "create error" });
  }
};

deleteProductById = async (req, res) => {
  const client = await pool.connect();
  try {
    const { productid, sellerid } = req.body;
    const data = await client.query(
      "DELETE FROM products WHERE uuid = $1 AND seller_uuid = $2",
      [productid, sellerid]
    );
    res.json({ status: "success", msg: "product deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "delete error" });
  }
};

updateProductById = async (req, res) => {
  const client = await pool.connect();
  try {
    const { uuid, sellerid, productname, description, price } = req.body;
    const updates = [];
    const values = [uuid, sellerid];
    let query = "UPDATE products SET";

    if (productname) {
      values.push(productname);
      updates.push(` product_name = $${values.length}`);
    }
    if (description) {
      values.push(description);
      updates.push(` description = $${values.length}`);
    }
    if (price) {
      values.push(price);
      updates.push(` price = $${values.length}`);
    }

    query +=
      updates.join(", ") + ` WHERE uuid = $1 AND seller_uuid = $2 RETURNING *`;

    const data = await pool.client(query, values);
    res.json({ status: "success", msg: "product updated" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "update error" });
  }
};

module.exports = {
  getAllProducts,
  getAllProductListingsBySellerId,
  createProduct,
  deleteProductById,
  updateProductById,
};

const express = require("express");
const { pool } = require("../database/database");

getAllProducts = async (req, res) => {
  const client = await pool.connect();
  try {
    const data = await client.query(
      "SELECT * FROM public.products ORDER BY date_listed DESC"
    );
    res.json(data.rows);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "fetch error" });
  } finally {
    client.release();
  }
};

getAllProductsForSale = async (req, res) => {
  const client = await pool.connect();
  try {
    const data = await client.query(
      "SELECT * FROM public.products WHERE purchased = false ORDER BY date_listed DESC"
    );
    res.json(data.rows);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "fetch error" });
  } finally {
    client.release();
  }
};


searchAllProducts = async (req, res) => {
  const client = await pool.connect();
  try {
    const { search } = req.body;
    const data = await client.query(
      "SELECT * FROM public.products WHERE purchased = false AND product_name LIKE $1 ORDER BY date_listed DESC",
      [`%${search}%`]
    );
    res.json(data.rows);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "fetch error" });
  } finally {
    client.release();
  }
};

getAllProductsForSaleForUser = async (req, res) => {
  const client = await pool.connect();
  try {
    const data = await client.query(
      "SELECT * FROM public.products WHERE seller_uuid != $1 AND purchased = false ORDER BY date_listed DESC",
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


searchAllProductsForUser = async (req, res) => {
  const client = await pool.connect();
  try {
    const { search } = req.body;
    const data = await client.query(
      "SELECT * FROM public.products WHERE seller_uuid != $1 AND purchased = false AND product_name LIKE $2 ORDER BY date_listed DESC",
      [req.decoded.uuid, `%${search}%`]
    );
    res.json(data.rows);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "fetch error" });
  } finally {
    client.release();
  }
};

getAllProductListingsBySellerId = async (req, res) => {
  const client = await pool.connect();
  try {
    const data = await client.query(
      "SELECT * FROM public.products WHERE seller_uuid = $1 AND purchased = false ORDER BY date_listed",
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

createProduct = async (req, res) => {
  const client = await pool.connect();
  try {
    const { productname, description, price } = req.body;

    const data = await client.query(
      "INSERT INTO products(product_name, description, price, seller_uuid) VALUES ($1, $2, $3, $4)",
      [productname, description, price, req.decoded.uuid]
    );
    res.json({ status: "success", msg: "product created" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "create error" });
  } finally {
    client.release();
  }
};

deleteProductById = async (req, res) => {
  const client = await pool.connect();
  try {
    const { productid } = req.body;
    const data = await client.query(
      "DELETE FROM products WHERE uuid = $1 AND seller_uuid = $2",
      [productid, req.decoded.uuid]
    );
    res.json({ status: "success", msg: "product deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "delete error" });
  } finally {
    client.release();
  }
};

updateProductById = async (req, res) => {
  const client = await pool.connect();
  try {
    const { productid, productname, description, price } = req.body;
    const updates = [];
    const values = [productid, req.decoded.uuid];
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

    const data = await client.query(query, values);
    res.json({ status: "success", msg: "product updated" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "update error" });
  } finally {
    client.release();
  }
};

module.exports = {
  getAllProducts,
  getAllProductsForSale,
  searchAllProducts,
  getAllProductsForSaleForUser,
  searchAllProductsForUser,
  getAllProductListingsBySellerId,
  createProduct,
  deleteProductById,
  updateProductById,
};

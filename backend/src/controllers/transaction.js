const express = require("express");
const { pool } = require("../database/database");

purchaseCredits = async (req, res) => {
  const client = await pool.connect();
  try {
    const { value } = req.body;
    const data = await client.query(
      "UPDATE users SET wallet = wallet + $2 WHERE uuid = $1 RETURNING *",
      [req.decoded.uuid, value]
    );
    res.json({ status: "success", msg: "successful purchase of credits" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "purchase credits error" });
  } finally {
    client.release();
  }
};

createTransaction = async (req, res) => {
  const client = await pool.connect();
  try {
    const { productid } = req.body;

    const productdata = await client.query(
      "SELECT products.price, products.seller_uuid FROM products WHERE products.uuid = $1",
      [productid]
    );
    const buyerdata = await client.query(
      "SELECT users.wallet FROM users WHERE users.uuid = $1",
      [req.decoded.uuid]
    );
    const userwallet = parseInt(buyerdata.rows[0].wallet);
    const productprice = parseInt(productdata.rows[0].price);

    const sellerid = productdata.rows[0].seller_uuid;

    if (req.decoded.uuid != sellerid) {
      if (userwallet >= productprice) {
        await client.query("BEGIN");
        await client.query(
          "INSERT INTO transactions(buyer_id, product_id) VALUES($1, $2);",
          [req.decoded.uuid, productid]
        );
        await client.query(
          "UPDATE users SET wallet = wallet - $1 WHERE uuid = $2;",
          [productprice, req.decoded.uuid]
        );
        await client.query(
          "UPDATE users SET wallet = wallet + $1 WHERE uuid = $2;",
          [productprice, sellerid]
        );
        await client.query(
          "UPDATE products SET purchased = true WHERE uuid = $1;",
          [productid]
        );
        await client.query("COMMIT");
        res.json({ status: "success", msg: "transaction created" });
      } else {
        res.status(400).json({ msg: "not enough credits" });
      }
    } else {
      res.json({ msg: "can't buy your own goods" });
    }
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "purchase error"});
  } finally {
    client.release();
  }
};

getAllTransactions = async (req, res) => {
  const client = await pool.connect();
  try {
    const data = await client.query("SELECT * FROM transactions");
    res.json(data.rows);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "fetch error" });
  } finally {
    client.release();
  }
};

getTransactionsByUserId = async (req, res) => {
  const client = await pool.connect();
  try {
    const data = await client.query(
      "SELECT * FROM transactions JOIN products ON transactions.product_id = products.uuid WHERE buyer_id = $1 OR seller_uuid = $1 ORDER BY date_transacted DESC",
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

module.exports = {
  purchaseCredits,
  createTransaction,
  getAllTransactions,
  getTransactionsByUserId,
};

const express = require("express");
const { pool } = require("../database/database");

purchaseCredits = async (req, res) => {
  const client = await pool.connect();
  try {
    const { userid, value } = req.body;
    const data = await client.query(
      "UPDATE users SET wallet = wallet + $2 WHERE uuid = $1 RETURNING *",
      [userid, value]
    );
    res.json({ status: "success", msg: "successful purchase of credits" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "purchase credits error" });
  }
};

createTransaction = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const { buyerid, productid } = req.body;

    const productdata = await client.query(
      "SELECT products.price, products.seller_uuid FROM products WHERE products.uuid = $1",
      [productid]
    );
    const buyerdata = await client.query(
      "SELECT users.wallet FROM users WHERE users.uuid = $1",
      [buyerid]
    );

    console.log(buyerdata.rows[0], productdata.rows[0]);

    if (buyerid != productdata.rows.seller_uuid) {
      if (buyerdata.rows[0].wallet > productdata.rows[0].price) {
        const data = await client.query(
          "INSERT INTO transactions(buyer_id, product_id) VALUES($1, $2)",
          [buyerid, productid]
        );

        // console.log(data);
        await client.query("COMMIT");
        res.json({ status: "success", msg: "transaction created" });
      } else {
        res.json({ msg: "not enough credits" });
      }
    } else {
      res.json({ msg: "can't buy your own goods" });
    }
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "create error" });
  } finally {
    client.release();
  }
};

getTransactionsByUserId = async (req, res) => {
  const client = await pool.connect();
  try {
    const { userid } = req.body;
    const data = await client.query(
      "SELECT * FROM transactions JOIN products ON transactions.buyer_id = products.uuid WHERE buyer_id = $1 OR seller_uuid = $1 ORDER BY date_transacted",
      [userid]
    );
    res.json(data.rows);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "fetch error" });
  }
};

module.exports = {
  purchaseCredits,
  createTransaction,
  getTransactionsByUserId,
};

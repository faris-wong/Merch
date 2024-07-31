import React, { useState } from "react";
import styles from "./css/BuyCard.module.css";

const BuyCardLogout = (props) => {
  return (
    <div class="container">
      <div className={styles.list}>
        <div className={styles.overlay}>{props.forsale.description}</div>
        <span class="col-md-3">{props.forsale.product_name}</span>
        <span class="col-md-6"></span>
        <span class="col-md-3">{props.forsale.price}</span>
      </div>
    </div>
  );
};

export default BuyCardLogout;

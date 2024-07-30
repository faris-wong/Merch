import React, { useState } from "react";
import styles from "./css/BuyCard.module.css";

const BuyCardLogout = (props) => {
  return (
    <div>
      <div className={styles.list}>
        <div className={styles.overlay}>{props.forsale.description}</div>
        <span className={styles}>{props.forsale.product_name}</span>
        <span className={styles}>{props.forsale.price}</span>
      </div>
    </div>
  );
};

export default BuyCardLogout;

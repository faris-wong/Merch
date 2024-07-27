import React, { useState } from "react";
import styles from "./css/BuyCard.module.css";
import BuyConfirmModal from "./BuyConfirmModal";

const BuyCard = (props) => {
  const [showBuyModal, setShowBuyModal] = useState(false);

  return (
    <div>
      <div className={styles.list}>
        <span className={styles}>{props.forsale.product_name}</span>
        <span className={styles}>{props.forsale.description}</span>
        <span className={styles}>{props.forsale.price}</span>
        <span>
          <button onClick={() => setShowBuyModal(true)}>Buy</button>
        </span>
        {showBuyModal && (
          <BuyConfirmModal
            setShowBuyModal={setShowBuyModal}
            forsale={props.forsale}
          ></BuyConfirmModal>
        )}
      </div>
    </div>
  );
};

export default BuyCard;

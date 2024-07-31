import React, { useState } from "react";
import styles from "./css/BuyCard.module.css";
import BuyConfirmModal from "./BuyConfirmModal";

const BuyCard = (props) => {
  const [showBuyModal, setShowBuyModal] = useState(false);

  return (
    <div>
      <div class="container">
        <div className={styles.list}>
          <div className={styles.overlay}>{props.forsale.description}</div>
          <span className="col-md-3">{props.forsale.product_name}</span>
          <span className="col-md-3">{props.forsale.username}</span>
          <span className="col-md-3">{props.forsale.price}</span>
          <span className="col-md-3">
            <button onClick={() => setShowBuyModal(true)}>Buy</button>
          </span>
        </div>
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

import React, { useState } from "react";
import styles from "./css/SellCard.module.css";
import UpdateList from "./UpdateList";
import DeleteList from "./DeleteList";

const SellCard = (props) => {
  const [showUpdateList, setShowUpdateList] = useState(false);
  const [showDeleteList, setShowDeleteList] = useState(false);

  return (
    <>
      <div className={styles.list}>
        <span className={styles.listname}>{props.list.product_name}</span>
        <span className={styles.listdesc}>{props.list.description}</span>
        <span className={styles.listprice}>{props.list.price}</span>
        <span className={styles.button}>
          <span>
            <button onClick={() => setShowUpdateList(true)}>Update</button>
          </span>
          {showUpdateList && (
            <UpdateList
              setShowUpdateList={setShowUpdateList}
              list={props.list}
            ></UpdateList>
          )}
          <span>
            <button onClick={() => setShowDeleteList(true)}>Delete</button>
          </span>
        </span>
        {showDeleteList && (
          <DeleteList
            setShowDeleteList={setShowDeleteList}
            list={props.list}
          ></DeleteList>
        )}
      </div>
    </>
  );
};

export default SellCard;

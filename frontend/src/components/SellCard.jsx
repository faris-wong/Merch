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
        <div></div>
        <span className="col-md-3">{props.list.product_name}</span>
        <span className="col-md-4">{props.list.description}</span>
        <span className="col-md-4">{props.list.price}</span>
        <span className="col-md-2">
          <span className={styles.button}>
            <button onClick={() => setShowUpdateList(true)}>update</button>
          </span>
          {showUpdateList && (
            <UpdateList
              setShowUpdateList={setShowUpdateList}
              list={props.list}
            ></UpdateList>
          )}
          <span className={styles.button}>
            <button onClick={() => setShowDeleteList(true)}>delete</button>
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

import React, { useState, useContext } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import ReactDOM from "react-dom";
import styles from "./css/DeleteList.module.css";

const Overlay = (props) => {
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);
  const { mutate } = useMutation({
    mutationFn: async (productid) => {
      return await usingFetch(
        "/product",
        "DELETE",
        {
          productid,
        },
        userCtx.accessToken
      );
    },
  });

  const handleDelete = () => {
    mutate(props.list.uuid);
    props.setShowDeleteList(false);
  };
  return (
    <>
      <div className={styles.backdrop}>
        <div className={styles.modal}>
          <div>
            <div>Confirm delete {props.list.product_name}?</div>
            <div>
              <button onClick={handleDelete}>Confirm</button>
            </div>
          </div>
          <button onClick={() => props.setShowDeleteList(false)}>close</button>
        </div>
      </div>
    </>
  );
};

const DeleteList = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay
          setShowDeleteList={props.setShowDeleteList}
          list={props.list}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default DeleteList;

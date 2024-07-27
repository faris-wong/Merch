import React, { useState, useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import ReactDOM from "react-dom";
import styles from "./css/DeleteList.module.css";

const Overlay = (props) => {
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (productid) => {
      return await usingFetch(
        "/purchase",
        "PUT",
        {
          productid,
        },
        userCtx.accessToken
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forsale"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  const handleBuy = () => {
    mutate(props.forsale.uuid);
    props.setShowBuyModal(false);
  };
  return (
    <>
      <div className={styles.backdrop}>
        <div className={styles.modal}>
          <div>
            <div>
              Confirm Buy {props.forsale.product_name} for {props.forsale.price}
            </div>
            <div>
              <button onClick={handleBuy}>Confirm</button>
            </div>
          </div>
          <button onClick={() => props.setShowBuyModal(false)}>close</button>
        </div>
      </div>
    </>
  );
};

const BuyConfirmModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay
          setShowBuyModal={props.setShowBuyModal}
          forsale={props.forsale}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default BuyConfirmModal;

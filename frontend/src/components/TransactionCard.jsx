import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import styles from "./css/TransactionCard.module.css";

const TransactionCard = (props) => {
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);

  const {
    isLoading,
    isError,
    error,
    data: transactiondata,
    refetch: fetchtransaction,
  } = useQuery({
    initialData: [],
    queryKey: ["transaction"],
    queryFn: async () => {
      try {
        return await usingFetch(
          "/tradehistory",
          "GET",
          undefined,
          userCtx.accessToken
        );
      } catch (error) {
        throw error.message;
      }
    },
    enabled: true,
  });

  if (isLoading) {
    return "isLoading";
  }

  return (
    <>
      <div>
        <div>Transaction History</div>
        <div></div>
        {transactiondata.map((transaction) =>
          transaction.buyer_id === userCtx.uuid ? (
            <li className={styles.bought}>
              {transaction.product_name} bought for: {transaction.price} date:{" "}
              {props.formatDate(transaction.date_transacted)}
            </li>
          ) : (
            <li className={styles.sold}>
              {transaction.product_name} sold for: {transaction.price} date:{" "}
              {props.formatDate(transaction.date_transacted)}
            </li>
          )
        )}
      </div>
    </>
  );
};

export default TransactionCard;

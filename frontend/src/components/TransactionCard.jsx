import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import styles from "./css/TransactionCard.module.css";

const TransactionCard = () => {
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);

  const {
    isLoading,
    isError,
    error,
    data: transactiondata,
    refetch: fetchtransaction,
  } = useQuery({
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
  console.log(transactiondata);
  return (
    <>
      <div>
        {transactiondata.map((transaction) =>
          transaction.buyer_id === userCtx.uuid ? (
            <li className={styles.green}>
              {transaction.product_name} bought for: {transaction.price} date:
              {transaction.date_transacted}
              {transaction.date_transacted}
            </li>
          ) : (
            <li className={styles.red}>
              {transaction.product_name} sold for: {transaction.price} date:
              {transaction.date_transacted}
              {transaction.date_transacted}
            </li>
          )
        )}
      </div>
    </>
  );
};

export default TransactionCard;

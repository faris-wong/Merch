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
        <div class="row">
          <div class="col">product</div>
          <div class="col">price transacted</div>
          <div class="col">date transacted</div>
        </div>
        {transactiondata.map((transaction) =>
          transaction.buyer_id === userCtx.uuid ? (
            <li className={styles.bought}>
              <div class="row">
                <div class="col">{transaction.product_name}</div>{" "}
                <div class="col">bought @ {transaction.price}</div>
                <div class="col">
                  {props.formatDate(transaction.date_transacted)}
                </div>
              </div>
            </li>
          ) : (
            <li className={styles.sold}>
              <div class="row">
                <div class="col">{transaction.product_name}</div>
                <div class="col">sold @ {transaction.price}</div>
                <div class="col">
                  {props.formatDate(transaction.date_transacted)}
                </div>
              </div>
            </li>
          )
        )}
      </div>
    </>
  );
};

export default TransactionCard;

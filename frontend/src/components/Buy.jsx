import React, { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import BuyCard from "./BuyCard";

const Buy = () => {
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);

  const {
    isLoading,
    isError,
    error,
    data: forsaledata,
  } = useQuery({
    queryKey: ["forsale"],
    queryFn: async () => {
      try {
        return await usingFetch(
          "/listingsforuser",
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
      {forsaledata.map((forsale) => (
        <BuyCard forsale={forsale}></BuyCard>
      ))}
    </>
  );
};

export default Buy;

import React, { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import SellCard from "./SellCard";
import CreateList from "./CreateList";

const Sell = () => {
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);
  const [showCreateListing, setShowCreateListing] = useState(false);

  const {
    isLoading,
    isError,
    error,
    data: listdata,
    refetch: refetchlistdata,
  } = useQuery({
    initialData: [],
    queryKey: ["list"],
    queryFn: async () => {
      try {
        return await usingFetch(
          "/listingbyuser",
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
      <div>All {userCtx.username}'s' Listings</div>
      {listdata.map((list) => (
        <SellCard list={list}></SellCard>
      ))}
      <button onClick={() => setShowCreateListing(true)}>
        add new listing
      </button>
      {showCreateListing && (
        <CreateList setShowCreateListing={setShowCreateListing}></CreateList>
      )}
    </>
  );
};

export default Sell;

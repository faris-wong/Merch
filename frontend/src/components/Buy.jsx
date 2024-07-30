import React, { useState, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import BuyCard from "./BuyCard";

const Buy = () => {
  const queryClient = useQueryClient();
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);
  const [search, setSearch] = useState("");

  const {
    isError,
    error,
    data: forsale,
  } = useQuery({
    initialData: [],
    queryKey: ["forsale", search],
    queryFn: async () => {
      try {
        return await usingFetch(
          "/searchbyuser",
          "POST",
          { search: search },
          userCtx.accessToken
        );
      } catch (error) {
        throw error.message;
      }
    },
    enabled: true,
  });

  const { data: profiledata, refetch: refetchprofiledata } = useQuery({
    initialData: ["x"],
    queryKey: ["profile"],
    queryFn: async () => {
      try {
        return await usingFetch("/user", "GET", undefined, userCtx.accessToken);
      } catch (error) {
        throw error.message;
      }
    },
    enabled: true,
  });

  return (
    <>
      <div>
        <input
          placeholder="search for item"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        ></input>
        {userCtx.accessToken && (
          <span>Wallet: {profiledata[0].wallet} credits</span>
        )}
      </div>
      {forsale.map((forsale) => (
        <BuyCard forsale={forsale}></BuyCard>
      ))}
    </>
  );
};

export default Buy;

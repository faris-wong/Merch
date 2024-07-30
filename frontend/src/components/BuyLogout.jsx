import React, { useState, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import BuyCardLogout from "./BuyCardLogout";

const BuyLogout = () => {
  const queryClient = useQueryClient();
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);
  const [search, setSearch] = useState("");

  const {
    isError,
    error,
    data: searchdata,
  } = useQuery({
    initialData: [],
    queryKey: ["search", search],
    queryFn: async () => {
      try {
        return await usingFetch("/search", "POST", { search: search });
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
      </div>
      {searchdata.map((forsale) => (
        <BuyCardLogout forsale={forsale}></BuyCardLogout>
      ))}
    </>
  );
};

export default BuyLogout;

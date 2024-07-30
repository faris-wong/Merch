import React, { useContext } from "react";
import UserContext from "../context/user";
import { useQuery } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
// import styles from "./css/TransactionCard.module.css";
import AllUsersCard from "./AllUsersCard";

const AllUsers = () => {
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);

  const {
    isLoading,
    isError,
    error,
    data: usersdata,
  } = useQuery({
    initialData: [],
    queryKey: ["users"],
    queryFn: async () => {
      try {
        return await usingFetch(
          "/users",
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

  console.log(usersdata);
  return (
    <>
      <div>ALL USERS</div>

      {usersdata.map((users) => {
        return <AllUsersCard users={users}></AllUsersCard>;
      })}
    </>
  );
};

export default AllUsers;

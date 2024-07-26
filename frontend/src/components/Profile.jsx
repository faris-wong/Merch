import React, { useState, useEffect, useContext } from "react";
import UserCard from "./UserCard";
import TransactionCard from "./TransactionCard";

const Profile = () => {
  //   const usingFetch = useFetch();
  //   const userCtx = useContext(UserContext);

  //   const {
  //     isLoading,
  //     isError,
  //     error,
  //     data: profiledata,
  //     refetch: fetchprofile,
  //   } = useQuery({
  //     queryKey: ["profile"],
  //     queryFn: async () => {
  //       try {
  //         return await usingFetch("/user", "GET", undefined, userCtx.accessToken);
  //       } catch (error) {
  //         throw error.message;
  //       }
  //     },
  //     enabled: true,
  //   });

  //   if (isLoading) {
  //     return "isLoading";
  //   }

  return (
    <>
      <UserCard></UserCard>
      <TransactionCard></TransactionCard>
    </>
  );
};

export default Profile;

import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { jwtDecode } from "jwt-decode";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import UpdateUserCard from "./UpdateUserCard";

const UserCard = (props) => {
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);
  const [showUpdateUser, setShowUpdateUser] = useState(false);

  const {
    isLoading,
    isError,
    error,
    data: profiledata,
    refetch: refetchprofiledata,
  } = useQuery({
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

  if (isLoading) {
    return "isLoading";
  }

  return (
    <div>
      <div>User Profile</div>
      <div>Username: {profiledata[0].username}</div>
      <div>Email: {profiledata[0].email}</div>
      <div>Contact: {profiledata[0].contact}</div>
      <div>Address: {profiledata[0].address}</div>
      <div>Wallet: {profiledata[0].wallet} credits</div>
      <div>Date joined: {props.formatDate(profiledata[0].date_joined)}</div>
      <button onClick={() => setShowUpdateUser(true)}>update</button>
      {showUpdateUser && (
        <UpdateUserCard setShowUpdateUser={setShowUpdateUser}></UpdateUserCard>
      )}
    </div>
  );
};

export default UserCard;

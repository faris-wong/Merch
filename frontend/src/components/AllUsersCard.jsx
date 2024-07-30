import React, { useState, useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

const AllUsersCard = (props) => {
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (uuid) => {
      return await usingFetch(
        "/user",
        "DELETE",
        {
          uuid,
        },
        userCtx.accessToken
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const handleDelete = () => {
    mutate(props.users["uuid"]);
  };

  const formatDate = (date) => {
    const datetime = new Date(date);
    return datetime.toLocaleString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });
  };

  return (
    <div>
      <span>{props.users["username"]} </span>
      <span>{props.users["wallet"]} </span>
      <span>{props.users["contact"]} </span>
      <span>{formatDate(props.users["date_joined"])} </span>
      {props.users["role"] === "USER" && (
        <span>
          <button onClick={handleDelete}>delete</button>
        </span>
      )}
    </div>
  );
};

export default AllUsersCard;

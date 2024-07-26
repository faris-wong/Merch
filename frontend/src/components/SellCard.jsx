import React, { useState, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

const SellCard = (props) => {
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);
  const { mutate } = useMutation({
    mutationFn: async (productid) => {
      return await usingFetch(
        "/product",
        "DELETE",
        {
          productid,
        },
        userCtx.accessToken
      );
    },
  });

  const handleDelete = () => {
    mutate(props.list.uuid);
  };
  return (
    <>
      <div>
        {props.list.product_name}
        {props.list.description}
        {props.list.price}
        <button>update</button>
        <button onClick={handleDelete}>delete</button>
      </div>
    </>
  );
};

export default SellCard;

import React, { useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import { useMutation } from "@tanstack/react-query";
import UserContext from "../context/user";

const Credits = () => {
  const usingFetch = useFetch();
  const [value, setValue] = useState("");
  const userCtx = useContext(UserContext);

  const { mutate } = useMutation({
    mutationFn: async (value) => {
      return await usingFetch(
        "/credits",
        "PATCH",
        {
          value,
        },
        userCtx.accessToken
      );
    },
  });

  const handleSubmit = () => {
    mutate(value); // change to not accept negataive values
    setValue("");
    console.log("successful top up");
  };

  return (
    <>
      <div>
        Buy Credits
        <input
          placeholder="input amount"
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></input>
        <button onClick={handleSubmit}>Purchase</button>
      </div>
    </>
  );
};

export default Credits;

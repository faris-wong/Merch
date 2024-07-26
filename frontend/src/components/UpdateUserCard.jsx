import React, { useState, useContext } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import ReactDOM from "react-dom";
import UserContext from "../context/user";
import styles from "./css/UpdateUserCard.module.css";
import useFetch from "../hooks/useFetch";

const Overlay = (props) => {
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);
  const [updateUser, setUpdateUser] = useState({
    username: "",
    address: "",
    contact: "",
  });

  const { mutate } = useMutation({
    mutationFn: async (formData) => {
      const { username, address, contact } = formData;
      return await usingFetch(
        "/user",
        "PATCH",
        {
          username,
          address,
          contact,
        },
        userCtx.accessToken
      );
    },
  });

  const handleSubmit = () => {
    mutate(updateUser);
    props.setShowUpdateUser(false);
  };

  return (
    <>
      <div className={styles.backdrop}>
        <div className={styles.modal}>
          <div>
            <div>Update Profile</div>

            <div>
              Username:
              <input
                onChange={(e) =>
                  setUpdateUser({ ...updateUser, username: e.target.value })
                }
                value={updateUser.username}
                type="text"
              ></input>
            </div>
            <div>
              Address:
              <input
                onChange={(e) =>
                  setUpdateUser({ ...updateUser, address: e.target.value })
                }
                value={updateUser.address}
                type="text"
              ></input>
            </div>
            <div>
              Contact:
              <input
                onChange={(e) =>
                  setUpdateUser({ ...updateUser, contact: e.target.value })
                }
                value={updateUser.contact}
                type="text"
              ></input>
            </div>
            <button onClick={handleSubmit}>Submit</button>
          </div>

          <button onClick={() => props.setShowUpdateUser(false)}>close</button>
        </div>
      </div>
    </>
  );
};

const Register = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay setShowUpdateUser={props.setShowUpdateUser} />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default Register;

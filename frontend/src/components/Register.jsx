import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import ReactDOM from "react-dom";
import styles from "./css/Register.module.css";
import useFetchNT from "../hooks/useFetchNT";

const Overlay = (props) => {
  const usingFetch = useFetchNT();
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    contact: "",
    address: "",
    role: "USER",
  });

  const { mutate } = useMutation({
    mutationFn: async (formData) => {
      const { email, password, username, role, address, contact } = formData;
      return await usingFetch("/register", "PUT", {
        email,
        password,
        username,
        role,
        address,
        contact,
      });
    },
  });

  const handleSubmit = () => {
    mutate(form);
    props.setShowRegister(false);
  };

  console.log(form);
  return (
    <>
      <div className={styles.backdrop}>
        <div className={styles.modal}>
          <div>
            <div>Registration Form</div>
            <div>
              Email:
              <input
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                value={form.email}
                type="text"
              ></input>
            </div>
            <div>
              Password:
              <input
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                value={form.password}
                type="password"
              ></input>
            </div>
            <div>
              Username:
              <input
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                value={form.username}
                type="text"
              ></input>
            </div>
            <div>
              Contact:
              <input
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                value={form.contact}
                type="text"
              ></input>
            </div>
            <div>
              Address:
              <input
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                value={form.address}
                type="text"
              ></input>
            </div>
            <div>
              <select
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                value={form.role}
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>

          <button onClick={() => props.setShowRegister(false)}>close</button>
        </div>
      </div>
    </>
  );
};

const Register = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay setShowRegister={props.setShowRegister} />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default Register;

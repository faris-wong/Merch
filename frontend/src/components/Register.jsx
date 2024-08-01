import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import ReactDOM from "react-dom";
import styles from "./css/Register.module.css";
import useFetchNT from "../hooks/useFetchNT";
import successsound from "../assets/success.mp3";

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

  const playsuccesssound = () => {
    const audio = new Audio(successsound);
    audio.play();
  };

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
    onSuccess: () => {
      props.setShowRegister(false);
      playsuccesssound();
    },
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = {};
    if (!emailRegex.test(form.email)) {
      newErrors.email = " invalid Email";
    }
    if (form.username.trim().length === 0) {
      newErrors.username = " username is required";
    }
    if (form.password.length < 8) {
      newErrors.password = " password needs to be at least 8 characters";
    }
    if (!/^\d{8}$/.test(form.contact)) {
      newErrors.contact = " invalid 8 digit HP contact";
    }
    setErrors(newErrors);
    console.log(errors.length);
  };

  const handleSubmit = () => {
    validateForm();
    if (Object.keys(errors).length === 0) {
      mutate(form);
    }
  };

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
                required
              ></input>
              {errors.email && (
                <span style={{ color: "red" }}>{errors.email}</span>
              )}
            </div>
            <div>
              Password:
              <input
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                value={form.password}
                type="password"
                required
              ></input>
              {errors.password && (
                <span style={{ color: "red" }}>{errors.password}</span>
              )}
            </div>
            <div>
              Username:
              <input
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                value={form.username}
                type="text"
                required
              ></input>
              {errors.username && (
                <span style={{ color: "red" }}>{errors.username}</span>
              )}
            </div>
            <div>
              Contact:
              <input
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                value={form.contact}
                type="text"
              ></input>
              <span>
                {errors.contact && (
                  <span style={{ color: "red" }}> {errors.contact}</span>
                )}
              </span>
            </div>
            <div>
              Address:
              <input
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                value={form.address}
                type="text"
              ></input>
              <span></span>
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

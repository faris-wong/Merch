import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import styles from "./css/Profile.module.css";
import UserCard from "./UserCard";
import TransactionCard from "./TransactionCard";
import AllUsers from "./AllUsers";

const Profile = () => {
  const userCtx = useContext(UserContext);
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
    <div className={styles.profile}>
      <div className={styles.user}>
        <UserCard formatDate={formatDate}></UserCard>
      </div>
      {userCtx.role == "USER" && (
        <div className={styles.history}>
          <TransactionCard formatDate={formatDate}></TransactionCard>
        </div>
      )}
      {userCtx.role == "ADMIN" && (
        <div className={styles.userprofiles}>
          <AllUsers></AllUsers>
        </div>
      )}
    </div>
  );
};

export default Profile;

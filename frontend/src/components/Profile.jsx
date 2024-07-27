import React from "react";
import styles from "./css/Profile.module.css";
import UserCard from "./UserCard";
import TransactionCard from "./TransactionCard";

const Profile = () => {
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
      <div className={styles.history}>
        <TransactionCard formatDate={formatDate}></TransactionCard>
      </div>
    </div>
  );
};

export default Profile;

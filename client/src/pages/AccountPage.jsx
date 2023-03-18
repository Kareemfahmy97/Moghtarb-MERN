import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const AccountPage = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return (
      <div>
        <p>Loading....</p>
      </div>
    );
  }

  if (!loading && !user) {
    return <Navigate to={"/login"} />;
  }

  return <div>{`Welcome back ${user?.name}`}</div>;
};

export default AccountPage;

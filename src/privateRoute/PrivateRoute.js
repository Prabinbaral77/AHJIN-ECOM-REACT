import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState();

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  console.log(userDetails?.user?.is_superuser);
  // eslint-disable-next-line
  useEffect(() => {
    setIsAdmin(userDetails?.user?.is_superuser);
  }, [userDetails?.user?.is_superuser]); // eslint-disable-next-line

  return isAdmin ? children : <Navigate to="/admin" />;
};

export default PrivateRoute;

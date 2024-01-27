import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = (props) => {
  const auth = useSelector((data) => data.userDataSlice.userData);

  return auth ? <>{props.children}</> : <Navigate to={"/login"} />;
};

export default PrivateRoute;

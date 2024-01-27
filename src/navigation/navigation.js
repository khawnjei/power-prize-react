import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import LayoutDashboard from "../layout/layout";
import Login from "../pages/Auth/login/login";
import PrivateRoute from "./private-route";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <LayoutDashboard />
          </PrivateRoute>
        }
      ></Route>
    </Routes>
  );
};

export default Navigation;

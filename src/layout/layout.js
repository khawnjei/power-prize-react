import React from "react";
import { Layout, Menu } from "antd";
import {
  coinIcon,
  disputeIcon,
  homeIcon,
  logOutIcon,
  userIcon,
} from "../assets";
import "./layout.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Products from "../pages/products/products";
import { useDispatch } from "react-redux";
import { accessToken, refreshToken, userData } from "../redux/userDataSlice";
import AddNewService from "../pages/addNewService/addNewService";
import UpdateService from "../pages/updateService/updateService";
import ProductOrder from "../pages/productOrder/productOrder";
import ServiceOrder from "../pages/serviceOrder/serviceOrder";
import { callApi } from "../api/apiCaller";
import routes from "../api/routes";
import { useState } from "react";
import Loader from "../components/loader/loader";
import { GreenNotify, RedNotify } from "../helper/helper";
import Dashboard from "../pages/dashboard/dashboard";
import Quotes from "../pages/quotes/quotes";
import Dispute from "../pages/dispute/Dispute";
import TermsConditions from "../pages/terms&conditions/TermsConditions";
import PrivacyPolicy from "../pages/privacypolicy/PrivacyPolicy";
import UserList from "../pages/userList/userList";
import Prizes from "../pages/prizes/Prizes";
import Coins from "../pages/coins/Coins";
import Profile from "../pages/profile/Profile";
import Home from "../pages/home/Home";
import EditRaffle from "../pages/editraffle/EditRaffle";
import NewRaffle from "../pages/newraffle/NewRaffle";
import EditCoins from "../components/editcoins/EditCoins";
import AddCoins from "../components/addcoins/AddCoins";

const { Content, Sider } = Layout;
const LayoutDashboard = () => {
  const [isloading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(userData(null));
    let getRes = (res) => {
      if (res.status == 200) {
        GreenNotify(res.message);
        dispatch(userData(null));
        dispatch(accessToken(""));
        dispatch(refreshToken(""));
      } else {
        RedNotify(res.message);
      }
    };

    let body = {
      device: {
        id: localStorage.getItem("deviceId"),
        deviceToken: "xyz",
      },
    };

    callApi("POST", routes.logOut, body, setIsLoading, getRes, (error) => {
      console.log("error", error);
    });
  };
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Loader loading={isloading} />
      <Sider
        style={{ background: "#FDD216", fontSize: "2rem", fontWeight: "400" }}
        width={280}
      >
        <div
          onClick={() => navigate("/")}
          style={{
            paddingTop: "4rem",
            textAlign: "center",
            color: "#080807",
            fontSize: "2.3rem",
            cursor: "pointer",
            fontWeight: "400",
          }}
        >
          Power Prize
        </div>
        <Menu
          style={{ marginTop: "7rem" }}
          inlineCollapsed={true}
          theme="#FDD216"
          defaultSelectedKeys={["1"]}
          mode="inline"
        >
          <Menu.Item
            style={{
              marginBottom: "2rem",
              fontSize: "2rem",
              fontWeight: "400",
            }}
            onClick={() => navigate("/home")}
            icon={<img className="icon" src={homeIcon} alt="" />}
            key="92"
          >
            Home
          </Menu.Item>
          <Menu.Item
            style={{
              marginBottom: "2rem",
              fontSize: "2rem",
              fontWeight: "400",
            }}
            onClick={() => navigate("/coins")}
            icon={<img className="icon" src={coinIcon} alt="" />}
            key="108"
          >
            Coins
          </Menu.Item>
          <Menu.Item
            style={{
              marginBottom: "2rem",
              fontSize: "2rem",
              fontWeight: "400",
            }}
            onClick={() => navigate("/user-list")}
            icon={<img className="icon1" src={userIcon} alt="" />}
            key="108"
          >
            Users
          </Menu.Item>
          <Menu.Item
            style={{
              marginBottom: "2rem",
              fontSize: "2rem",
              fontWeight: "400",
            }}
            onClick={() => navigate("/dispute")}
            icon={<img className="side-bar-icon" src={disputeIcon} alt="" />}
            key="108"
          >
            Dispute
          </Menu.Item>
          <Menu.Item
            style={{ marginTop: "5rem", fontSize: "2rem", fontWeight: "400" }}
            icon={<img className="icon2" src={logOutIcon} alt="" />}
            onClick={logOut}
            key="89"
          >
            Log Out
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content
          style={{
            background: "#fff",
            paddingTop: "2rem",
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/products" element={<Products />}></Route>
            <Route path="/quotes" element={<Quotes />}></Route>
            <Route path="/new-service" element={<AddNewService />}></Route>
            <Route path="/update-service" element={<UpdateService />}></Route>
            <Route path="/user-list" element={<UserList />}></Route>
            <Route path="/dispute" element={<Dispute />}></Route>
            <Route path="/privacyPolicy" element={<PrivacyPolicy />}></Route>
            <Route path="/prizes" element={<Prizes />}></Route>
            <Route path="/coins" element={<Coins />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/editraffle" element={<EditRaffle />}></Route>
            <Route path="/newraffle" element={<NewRaffle />}></Route>
            <Route path="/editcoins" element={<EditCoins />}></Route>
            <Route path="/addcoins" element={<AddCoins />}></Route>
            <Route
              path="/termsConditions"
              element={<TermsConditions />}
            ></Route>
            <Route
              path="/products-order-list"
              element={<ProductOrder />}
            ></Route>
            <Route
              path="/services-order-list"
              element={<ServiceOrder />}
            ></Route>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutDashboard;

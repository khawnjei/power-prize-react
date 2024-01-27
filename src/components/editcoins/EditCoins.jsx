import React from "react";
import { useState } from "react";
import Input from "antd/es/input/Input";
import { Button, Col, Row, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { GreenNotify } from "../../helper/helper";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import Loader from "../../components/loader/loader";

const EditCoins = () => {
  const location = useLocation();
  const [coin, setCoin] = useState(location?.state?.item?.coin);
  const [amount, setAmount] = useState(location?.state?.item?.amount);
  const [isloading, setIsLoading] = useState(false);
  const id = location?.state?.item?._id;
  console.log(location?.state?.item?._id);
  const navigate = useNavigate();

  const updateCoins = () => {
    let getRes = (res) => {
      console.log("res of updateRaffle", res);
      GreenNotify("Raffle is updated successfully");
      navigate("/coins");
    };

    let body = {
      coin: coin * 1,
      amount: amount * 1,
    };

    callApi(
      "PATCH",
      `${routes.updateCoins}/${id}`,
      body,
      setIsLoading,
      getRes,
      (error) => {
        console.log("error", error);
      }
    );
  };

  return (
    <>
      <div style={{ marginBottom: "2rem", padding: "3rem" }}>
        <Loader loading={isloading} />
        <h2>Edit Coins</h2>
        <Row gutter={216}>
          <Col span={8}>
            <Typography.Title level={5} style={{ marginTop: "2rem" }}>
              Coins
            </Typography.Title>
            <Input
              style={{ marginTop: "1rem", height: "5rem" }}
              value={coin}
              onChange={(e) => setCoin(e.target.value)}
              placeholder="Coins"
            />
          </Col>
          <Col span={8}>
            <Typography.Title level={5} style={{ marginTop: "2rem" }}>
              Amount
            </Typography.Title>
            <Input
              style={{ marginTop: "1rem", height: "5rem" }}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
            />
          </Col>
        </Row>
        <Button
          type="primary"
          style={{ marginTop: "2rem" }}
          onClick={updateCoins}
        >
          Edit
        </Button>
      </div>
    </>
  );
};

export default EditCoins;

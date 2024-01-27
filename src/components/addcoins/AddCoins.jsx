import React, { useEffect, useState } from "react";
import Input from "antd/es/input/Input";
import { Button, Row, Col, Typography } from "antd";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import { GreenNotify } from "../../helper/helper";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/loader";
import { DatePicker, Space } from "antd";

const AddCoins = () => {
  const [isloading, setIsLoading] = useState(false);
  const [coin, setCoins] = useState("");
  const [amount, setAmount] = useState("");

  const navigate = useNavigate();

  const getAllCoins = () => {
    let getRes = (res) => {
      console.log("res of get response", res);
    };

    callApi("GET", routes.getCoins, null, setIsLoading, getRes, (error) => {
      console.log("error", error);
    });
  };
  useEffect(() => {
    getAllCoins();
  }, []);

  let body = {
    coin: coin * 1,
    amount: amount * 1,
  };

  const createCoins = () => {
    let getRes = (res) => {
      console.log("res of createCoins", res);
      GreenNotify("Coins are created successfully");
      navigate("/coins");
    };

    callApi("POST", routes.createCoins, body, setIsLoading, getRes, (error) => {
      console.log("error", error);
    });
  };

  return (
    <>
      <div style={{ marginBottom: "2rem", padding: "3rem" }}>
        <Loader loading={isloading} />
        <h2>Create Coins</h2>
        <>
          <Row gutter={216}>
            <Col span={8}>
              <Typography.Title level={5} style={{ marginTop: "2rem" }}>
                Coins
              </Typography.Title>
              <Input
                style={{
                  marginTop: "1rem",
                  height: "5rem",
                  width: "50rem",
                  fontSize: "1.8rem",
                }}
                value={coin}
                onChange={(e) => setCoins(e.target.value)}
                placeholder="Coins"
              />
            </Col>
            <Col span={8}>
              <Typography.Title level={5} style={{ marginTop: "2rem" }}>
                Amount
              </Typography.Title>
              <Input
                style={{
                  marginTop: "1rem",
                  height: "5rem",
                  width: "50rem",
                  fontSize: "1.8rem",
                }}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
              />
            </Col>
          </Row>
        </>
      </div>

      <Button
        type="primary"
        style={{ marginLeft: "3rem" }}
        onClick={createCoins}
      >
        Create
      </Button>
    </>
  );
};

export default AddCoins;

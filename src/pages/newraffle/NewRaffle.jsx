import React, { useEffect, useState } from "react";
import Input from "antd/es/input/Input";
import { Button, Row, Col, Typography } from "antd";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import { GreenNotify } from "../../helper/helper";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/loader";
import { DatePicker, Space } from "antd";

const NewRaffle = () => {
  const [isloading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [coins, setCoins] = useState("");
  const [description, setDescription] = useState("");
  const [terms, setTerms] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const navigate = useNavigate();

  const getAllRaffles = () => {
    let getRes = (res) => {
      console.log("res of get response", res);
    };

    callApi("GET", routes.getRaffles, null, setIsLoading, getRes, (error) => {
      console.log("error", error);
    });
  };
  useEffect(() => {
    getAllRaffles();
  }, []);

  let body = {
    title,
    price,
    coins,
    description,
    terms,
    startTime,
    endTime,
  };

  const createRaffle = () => {
    let getRes = (res) => {
      console.log("res of createRaffle", res);
      GreenNotify("Raffle is created successfully");
      navigate("/home");
    };

    callApi(
      "POST",
      routes.createRaffle,
      body,
      setIsLoading,
      getRes,
      (error) => {
        console.log("error", error);
      }
    );
  };

  const handleStartTime = (e, date) => {
    setStartTime(e);
  };

  const handleEndTime = (e, date) => {
    setEndTime(e);
  };

  const onOk = (value) => {
    console.log("onOk: ", value);
  };

  const dateFormat = "YYYY/MM/DD hh:mm";

  return (
    <>
      <div style={{ marginBottom: "2rem", padding: "3rem" }}>
        <Loader loading={isloading} />
        <h2>Create Raffle</h2>
        <>
          <Row gutter={216}>
            <Col span={8}>
              <Typography.Title level={5} style={{ marginTop: "2rem" }}>
                Title
              </Typography.Title>
              <Input
                style={{
                  marginTop: "1rem",
                  height: "5rem",
                  width: "50rem",
                  fontSize: "1.8rem",
                }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
              />
            </Col>
            <Col span={8}>
              <Typography.Title level={5} style={{ marginTop: "2rem" }}>
                Price
              </Typography.Title>
              <Input
                style={{
                  marginTop: "1rem",
                  height: "5rem",
                  width: "50rem",
                  fontSize: "1.8rem",
                }}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
              />
            </Col>
          </Row>
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
                value={coins}
                onChange={(e) => setCoins(e.target.value)}
                placeholder="Coins"
              />
            </Col>
            <Col span={8}>
              <Typography.Title level={5} style={{ marginTop: "2rem" }}>
                Description
              </Typography.Title>
              <Input
                style={{
                  marginTop: "1rem",
                  height: "5rem",
                  width: "50rem",
                  fontSize: "1.8rem",
                }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              />
            </Col>
          </Row>
          <Row gutter={216}>
            <Col span={8}>
              <Typography.Title level={5} style={{ marginTop: "2rem" }}>
                Terms
              </Typography.Title>
              <Input
                style={{
                  marginTop: "1rem",
                  height: "5rem",
                  width: "50rem",
                  fontSize: "1.8rem",
                }}
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
                placeholder="Terms"
              />
            </Col>
          </Row>
          <Row gutter={216}>
            <Col span={8}>
              <Typography.Title
                level={5}
                style={{ marginTop: "2rem", marginBottom: "2rem" }}
              >
                Start Time
              </Typography.Title>
              <div>
                <Space direction="vertical" size={12}>
                  <DatePicker
                    style={{ width: "30rem", height: "5rem" }}
                    showTime
                    format="YYYY-MM-DD hh:mm"
                    onChange={handleStartTime}
                    onOk={onOk}
                  />
                </Space>
              </div>
            </Col>
            <Col span={8}>
              <Typography.Title
                level={5}
                style={{ marginTop: "2rem", marginBottom: "2rem" }}
              >
                End Time
              </Typography.Title>
              <Space direction="vertical" size={12}>
                <DatePicker
                  style={{ width: "30rem", height: "5rem" }}
                  showTime
                  format="YYYY-MM-DD hh:mm"
                  onChange={handleEndTime}
                  onOk={onOk}
                />
              </Space>
            </Col>
          </Row>
        </>
      </div>

      <Button
        type="primary"
        style={{ marginLeft: "3rem" }}
        onClick={createRaffle}
      >
        Create
      </Button>
    </>
  );
};

export default NewRaffle;

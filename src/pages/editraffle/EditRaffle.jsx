import React from "react";
import { useState } from "react";
import Input from "antd/es/input/Input";
import { Button, Col, Row, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { GreenNotify } from "../../helper/helper";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import Loader from "../../components/loader/loader";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";

const EditRaffle = () => {
  const location = useLocation();
  const [title, setTitle] = useState(location?.state?.item?.title);
  const [price, setPrice] = useState(location?.state?.item?.price);
  const [coins, setCoins] = useState(location?.state?.item?.coins);
  const [description, setDescription] = useState(
    location?.state?.item?.description
  );
  const [terms, setTerms] = useState(location?.state?.item?.terms);
  const [startTime, setStartTime] = useState(location?.state?.item?.startTime);
  const [endTime, setEndTime] = useState(location?.state?.item?.endTime);
  const [isloading, setIsLoading] = useState(false);
  const id = location?.state?.item?._id;
  console.log(location?.state?.item?._id);
  const navigate = useNavigate();

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

  const updateRaffle = () => {
    let getRes = (res) => {
      console.log("res of updateRaffle", res);
      GreenNotify("Raffle is updated successfully");
      navigate("/home");
    };

    let body = {
      title: title,
      price: price * 1,
      coins: coins * 1,
      description: description,
      terms: terms,
      startTime: dayjs(startTime).toISOString(),
      endTime: dayjs(endTime).toISOString(),
    };

    callApi(
      "PATCH",
      `${routes.updateRaffle}/${id}`,
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
        <h2>Edit Raffle</h2>
        <Row gutter={216}>
          <Col span={8}>
            <Typography.Title level={5} style={{ marginTop: "2rem" }}>
              Title
            </Typography.Title>
            <Input
              style={{ marginTop: "1rem", height: "5rem" }}
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
              style={{ marginTop: "1rem", height: "5rem" }}
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
              style={{ marginTop: "1rem", height: "5rem" }}
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
              style={{ marginTop: "1rem", height: "5rem" }}
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
              style={{ marginTop: "1rem", height: "5rem" }}
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
                  defaultValue={dayjs(startTime, dateFormat)}
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
                defaultValue={dayjs(endTime, dateFormat)}
                format="YYYY-MM-DD hh:mm"
                onChange={handleEndTime}
                onOk={onOk}
              />
            </Space>
          </Col>
        </Row>
        <Button
          type="primary"
          style={{ marginTop: "2rem" }}
          onClick={updateRaffle}
        >
          Edit
        </Button>
      </div>
    </>
  );
};

export default EditRaffle;

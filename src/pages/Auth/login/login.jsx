import React, { useState } from "react";
import "./login.css";
import { Form, Input, Button, Checkbox } from "antd";
import { DeviceUUID } from "device-uuid";
import { callApi } from "../../../api/apiCaller";
import { useDispatch } from "react-redux";
import {
  accessToken,
  refreshToken,
  userData,
} from "../../../redux/userDataSlice";
import { useNavigate } from "react-router-dom";
import routes from "../../../api/routes";
import Loader from "../../../components/loader/loader";
import { GreenNotify, RedNotify } from "../../../helper/helper";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isloading, setIsLoading] = useState(false);

  const onFinish = (values) => {
    let deviceId = localStorage.getItem("deviceId");
    if (!deviceId) {
      let id = new DeviceUUID().get();
      localStorage.setItem("deviceId", id);
      deviceId = id;
    }

    let getRes = (res) => {
      if (res.status == 200) {
        console.log("res of login", res);
        dispatch(userData(res?.data?.user));
        dispatch(accessToken(res?.data?.token));
        dispatch(refreshToken(res?.data?.refreshToken));
        GreenNotify("Login Successfully");
        navigate("/", { replace: true });
      } else {
        RedNotify(res.message);
      }
    };
    let body = {
      email: values.email,
      password: values.password,
      device: {
        id: deviceId,
        deviceToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MGViODcyNzI2M2FlNmFmMTExNTRiZiIsImlhdCI6MTcwMTM4MTExM30.KcoeO0ZtLeGjv8V8FnkqbtyVixuu1W_eRWqBT_ehECo",
      },
    };
    callApi("POST", routes.logIn, body, setIsLoading, getRes, (error) => {});
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="admin-panel-login">
      <div className="login-main-container">
        <Loader loading={isloading} />
        <h1 style={{ marginBottom: "3rem" }}>Login</h1>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;

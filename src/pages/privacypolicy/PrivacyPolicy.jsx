import React, { useState, useEffect } from "react";
import { Breadcrumb, Table, Image } from "antd";
import {
  crossIcon,
  homeIcon,
  privacyIcon,
  redTrash,
  trueIcon,
} from "../../assets";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import Loader from "../../components/loader/loader";

const PrivacyPolicy = () => {
  const [users, setUsers] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [updateApi, setUpdateApi] = useState(false);

  const getAllUsers = () => {
    let getRes = (res) => {
      console.log("res of user list", res);
      setUsers(res?.data?.data);
    };

    callApi("GET", routes.getAllUsers, null, setIsLoading, getRes, (error) => {
      console.log("error", error);
    });
  };

  const deleteUser = (id) => {
    setUpdateApi(false);
    let getRes = (res) => {
      console.log("res of user list", res);
      setUpdateApi(true);
    };

    callApi(
      "DELETE",
      `${routes.deleteUser}/${id}`,
      null,
      setIsLoading,
      getRes,
      (error) => {
        console.log("error", error);
      }
    );
  };

  useEffect(() => {
    getAllUsers();
  }, [updateApi]);

  const columns = [
    {
      title: "Name",
      dataIndex: "firstName",
      className: "role-name-column-header",
    },

    {
      title: "Email",
      dataIndex: "email",
      align: "center",
      className: "type-name-column-header",
      width: 400,
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      align: "center",
      className: "action-column-header",
    },
    {
      title: "Profile Picture",
      dataIndex: "profilePicture",
      align: "center",
      className: "action-column-header",
    },
    {
      title: "Verified",
      dataIndex: "verified",
      align: "center",
      className: "action-column-header",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      align: "center",
      className: "action-column-header",
    },
    {
      title: "Delete",
      dataIndex: "delete",
      align: "center",
      className: "action-column-header",
    },
  ];

  const data = users?.map((item, index) => {
    return {
      key: index,
      firstName: item?.name,
      email: item?.email,
      phoneNumber: <p>{item.number}</p>,
      profilePicture: (
        <div className="product-list-image">
          <Image width={50} src={item?.image} alt="profile-image" />
        </div>
      ),
      verified: (
        <div className="server-roles-trash-btn">
          <img src={item?.verified ? trueIcon : crossIcon} alt="" />
        </div>
      ),
      gender: <p>{item.gender}</p>,
      delete: (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => deleteUser(item?._id)}
        >
          <img src={redTrash} alt="" />
        </div>
      ),
    };
  });

  const getRowClassName = (record, index) => {
    if (index % 2 === 0) {
      return "server-role-even-row";
    }
    return "server-role-odd-row";
  };
  return (
    <div className="admin-products-main-container">
      <Loader loading={isloading} />
      <Breadcrumb separator=">" className="bread-crumb">
        <div className="configure-server-home-icon">
          <img src={homeIcon} alt="home-icon" />
        </div>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <div className="configure-server-home-icon">
          <img src={privacyIcon} alt="home-icon" />
        </div>
        <Breadcrumb.Item>Privacy Policy</Breadcrumb.Item>
      </Breadcrumb>
      <div className="configure-server-roles-main-heading-container">
        <h1>Privacy Policy</h1> <div></div>
      </div>
      <div className="server-roles-tb-main-container">
        <Table
          rowClassName={getRowClassName}
          columns={columns}
          dataSource={data}
          pagination={true}
          className="ant-table-wrapper .ant-table-thead"
        ></Table>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

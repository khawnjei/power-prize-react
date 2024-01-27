import { useState, useEffect } from "react";
import React from "react";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import Loader from "../../components/loader/loader";
import { Breadcrumb, Button, Select, Image } from "antd";
import { addIcon, editIcon, homeIcon, redTrash } from "../../assets";
import { Table } from "antd";
import moment from "moment";

const Reviews = () => {
  const [isloading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  const getReview = () => {
    let getRes = (res) => {
      setReviews(res?.data?.data);
      console.log("res of get review", res);
      // setShowModal(false);
    };

    callApi(
      "GET",
      routes.getallReviews,
      null,
      setIsLoading,
      getRes,
      (error) => {
        console.log("error", error);
      }
    );
  };
  useEffect(() => getReview(), []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      className: "role-name-column-header",
    },
    {
      title: "Review",
      dataIndex: "review",
      align: "center",
      className: "type-name-column-header",
      width: 200,
      // render: (text) => <span style={{ color: "#34ADF4" }}>{text}</span>,
    },

    {
      title: "Date",
      dataIndex: "date",
      align: "right",
      className: "action-column-header",
    },
  ];

  const data = reviews?.map((item, index) => {
    return {
      key: index,
      name: item?.name,
      review: item?.review,
      date: moment(item?.createdAt).format("DD MMM, YYYY"),
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
        <Breadcrumb.Item>Products</Breadcrumb.Item>
      </Breadcrumb>

      <div className="server-roles-tb-main-container">
        <Table
          rowClassName={getRowClassName}
          columns={columns}
          dataSource={data}
          pagination={true}
          className="subscriptionapi-table"
        ></Table>
      </div>
    </div>
  );
};

export default Reviews;

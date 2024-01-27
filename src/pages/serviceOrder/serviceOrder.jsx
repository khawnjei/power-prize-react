import React, { useState, useEffect } from "react";
import { Breadcrumb, Button, Select, Table, Space } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { crossIcon, homeIcon, options, redTrash, trueIcon } from "../../assets";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import moment from "moment";
import Loader from "../../components/loader/loader";
import OptionModal from "../../components/optionModal/optionModal";

const ServiceOrder = () => {
  const [bookedServices, setBookedServices] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [showModalOption, setShowModalOption] = useState(false);
  const [optionsM, setOptionsM] = useState([]);
  const getAllServicesBooked = () => {
    let getRes = (res) => {
      setBookedServices(res?.serviceorder);
      console.log("res of booked services", res);
    };

    callApi(
      "GET",
      routes.allBookedServices,
      null,
      setIsLoading,
      getRes,
      (error) => {
        console.log("error", error);
      }
    );
  };

  const columns = [
    {
      title: "Client Name",
      dataIndex: "name",
      className: "role-name-column-header",
    },
    {
      title: "Client Image",
      dataIndex: "profileImage",
      className: "role-name-column-header",
    },

    {
      title: "Service Title",
      dataIndex: "serviceTitle",
      align: "center",
      className: "action-column-header",
    },
    {
      title: "Order No.",
      dataIndex: "orderNo",
      align: "center",
      className: "action-column-header",
    },
    {
      title: "Price",
      dataIndex: "Price",
      align: "center",
      className: "action-column-header",
    },
    {
      title: "Options",
      dataIndex: "options",
      align: "center",
      className: "action-column-header",
    },
    {
      title: "IsPaid",
      dataIndex: "ispaid",
      align: "center",
      className: "action-column-header",
    },
    {
      title: "Booking Time",
      dataIndex: "bookingTime",
      align: "center",
      className: "action-column-header",
      width: 300,
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      className: "action-column-header",

      filters: [
        {
          text: "Past",
          value: "past",
        },
        {
          text: "Canceled",
          value: "canceled",
        },
        {
          text: "Upcoming",
          value: "upcoming",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
  ];

  const data = bookedServices?.map((item) => {
    return {
      name: `${item?.user?.firstname} ${item?.user?.lastname} `,
      profileImage: (
        <div className="product-list-image">
          <img src={item?.user?.image} alt="profile-image" />
        </div>
      ),
      serviceTitle: item?.service?.title,
      orderNo: item?.order?.orderno,
      Price: `$${item?.amount}`,
      options: (
        <div
          onClick={() => {
            setOptionsM(item?.options);
            setShowModalOption(!showModalOption);
          }}
          className="service-background-option"
        >
          <img src={options} alt="options" />
        </div>
      ),
      ispaid: (
        <div className="server-roles-trash-btn">
          <img src={item?.order?.orderno ? trueIcon : crossIcon} alt="" />
        </div>
      ),
      bookingTime: moment(item?.starttime).format("DD-MM-YYYY HH:mm A"),
      status: item?.status,
    };
  });

  const getRowClassName = (record, index) => {
    if (index % 2 === 0) {
      return "server-role-even-row";
    }
    return "server-role-odd-row";
  };

  useEffect(() => {
    getAllServicesBooked();
  }, []);
  return (
    <div className="admin-products-main-container">
      <Loader loading={isloading} />
      {showModalOption && (
        <OptionModal
          showModalOption={showModalOption}
          setShowModalOption={setShowModalOption}
          options={optionsM}
        />
      )}
      <Breadcrumb separator=">" className="bread-crumb">
        <div className="configure-server-home-icon">
          <img src={homeIcon} alt="home-icon" />
        </div>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Services booking List</Breadcrumb.Item>
      </Breadcrumb>
      <div className="configure-server-roles-main-heading-container">
        <h1>Products Order</h1> <div></div>
      </div>
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

export default ServiceOrder;

import React, { useState, useEffect } from "react";
import { Breadcrumb, Table, Pagination } from "antd";
import { addIcon, editIcon, homeIcon, redTrash, userIcon } from "../../assets";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import Loader from "../../components/loader/loader";
import { useNavigate } from "react-router-dom";

const Coins = () => {
  const [coins, setCoins] = useState([].reverse());
  const [isloading, setIsLoading] = useState(false);
  const [updateApi, setUpdateApi] = useState(false);
  const navigate = useNavigate();

  const getAllCoins = () => {
    let getRes = (res) => {
      console.log("res of user list", res);
      setCoins(res?.data?.data);
    };

    callApi("GET", routes.getCoins, null, setIsLoading, getRes, (error) => {
      console.log("error", error);
    });
  };

  const deleteCoins = (id) => {
    setUpdateApi(false);
    let getRes = (res) => {
      console.log("res of user list", res);
      setUpdateApi(true);
    };

    callApi(
      "DELETE",
      `${routes.deleteCoins}/${id}`,
      null,
      setIsLoading,
      getRes,
      (error) => {
        console.log("error", error);
      }
    );
  };

  useEffect(() => {
    getAllCoins();
  }, [updateApi]);

  const columns = [
    {
      title: "Coins",
      dataIndex: "coins",
      className: "role-name-column-header",
    },

    {
      title: "Amount",
      dataIndex: "amount",
      align: "center",
      className: "type-name-column-header",
      width: 400,
    },
    {
      title: "Edit",
      dataIndex: "edit",
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

  const data = coins?.map((item, index) => {
    return {
      key: index,
      coins: item?.coin,
      amount: item?.amount,
      edit: (
        <div style={{ cursor: "pointer" }}>
          <img
            src={editIcon}
            alt="editIcon"
            onClick={() => navigate("/editcoins", { state: { item: item } })}
            style={{ width: "3rem" }}
          />
        </div>
      ),
      delete: (
        <div
          onClick={() => deleteCoins(item?._id)}
          style={{ cursor: "pointer" }}
        >
          <img src={redTrash} alt="red-trash" />
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
          <img src={userIcon} alt="home-icon" />
        </div>
        <Breadcrumb.Item>Coins</Breadcrumb.Item>
      </Breadcrumb>
      <div className="configure-server-roles-main-heading-container">
        <h1>Coins</h1>
        <div
          onClick={() => navigate("/addcoins")}
          className="server-roles-add-btn"
          style={{ backgroundColor: "#000" }}
        >
          <img src={addIcon} alt="" />
          <p>Add</p>
        </div>
      </div>
      <div className="server-roles-tb-main-container">
        <Table
          rowClassName={getRowClassName}
          columns={columns}
          dataSource={data}
          pagination={{ Pagination, pageSize: 5 }}
          className="ant-table-wrapper .ant-table-thead"
        ></Table>
      </div>
    </div>
  );
};

export default Coins;

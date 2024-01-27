import React, { useState, useEffect } from "react";
import { Breadcrumb, Table } from "antd";
import Loader from "../../components/loader/loader";
import { addIcon, editIcon, homeIcon, redTrash } from "../../assets";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import { useNavigate } from "react-router-dom";
import { GreenNotify } from "../../helper/helper";
import DescriptionModal from "../../components/descriptionModal/DescriptionModal1";
import TermsModal from "../../components/termsmodal/TermsModal";
import moment from "moment";

const Home = () => {
  const [isloading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [raffles, setRaffles] = useState([]);
  const [getServiceapi, setGetServiceApi] = useState(false);

  const getRaffles = () => {
    let getRes = (res) => {
      console.log("res of get response", res);
      setRaffles(res?.data?.data);
    };

    callApi("GET", routes.getRaffles, null, setIsLoading, getRes, (error) => {
      console.log("error", error);
    });
  };

  const deleteRaffle = (id) => {
    setGetServiceApi(false);
    let getRes = (res) => {
      console.log("res of deleteRaffle", res);
      GreenNotify("Raffle is deleted successfully");
      setGetServiceApi(true);
    };

    callApi(
      "DELETE",
      `${routes.deleteRaffle}/${id}`,
      null,
      setIsLoading,
      getRes,
      (error) => {
        console.log("error", error);
      }
    );
  };

  useEffect(() => {
    getRaffles();
  }, [getServiceapi]);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      className: "role-name-column-header",
    },

    {
      title: "Price",
      dataIndex: "price",
      align: "center",
      className: "type-name-column-header",
    },
    {
      title: "Coins",
      dataIndex: "coins",
      align: "center",
      className: "action-column-header",
    },
    {
      title: "Description",
      dataIndex: "description",
      align: "center",
      className: "action-column-header",
    },
    {
      title: "Terms",
      dataIndex: "terms",
      align: "center",
      className: "action-column-header",
    },
    {
      title: "Start Time",
      dataIndex: "starttime",
      align: "center",
      className: "action-column-header",
    },
    {
      title: "End Time",
      dataIndex: "endtime",
      align: "center",
      className: "action-column-header",
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

  const data = raffles?.map((item, index) => {
    return {
      key: index,
      title: (
        <div
          style={{ cursor: "pointer", fontSize: "15px", fontWeight: "bold" }}
        >
          <TermsModal terms={item?.title} />
        </div>
      ),
      price: item?.price,
      coins: item?.coins,
      description: (
        <div
          style={{ cursor: "pointer", fontSize: "15px", fontWeight: "bold" }}
        >
          <DescriptionModal description={item?.description} />
        </div>
      ),
      terms: (
        <div
          style={{ cursor: "pointer", fontSize: "15px", fontWeight: "bold" }}
        >
          <TermsModal terms={item?.terms} />
        </div>
      ),
      starttime: (
        <div>
          <p>{moment(item?.startTime).format("YYYY-MM-DD hh:mm")}</p>
        </div>
      ),
      endtime: (
        <div>
          <p>{moment(item?.endTime).format("YYYY-MM-DD hh:mm")}</p>
        </div>
      ),

      edit: (
        <div style={{ cursor: "pointer" }}>
          <img
            src={editIcon}
            alt="editIcon"
            onClick={() => navigate("/editraffle", { state: { item: item } })}
            style={{ width: "3rem" }}
          />
        </div>
      ),
      delete: (
        <div
          onClick={() => deleteRaffle(item?._id)}
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
      </Breadcrumb>
      <div className="configure-server-roles-main-heading-container">
        <h1>Raffles</h1>
        <div
          onClick={() => navigate("/newraffle")}
          className="server-roles-add-btn"
          style={{ backgroundColor: "#000" }}
        >
          <img src={addIcon} alt="" />
          <p>Add New Raflle</p>
        </div>
      </div>
      <div className="server-roles-tb-main-container">
        <Table
          rowClassName={getRowClassName}
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 5 }}
          className="subscriptionapi-table"
        ></Table>
      </div>
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import "./quotes.css";
import { Breadcrumb, Table } from "antd";
import Loader from "../../components/loader/loader";
import { addIcon, editIcon, homeIcon, redTrash } from "../../assets";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import { useNavigate } from "react-router-dom";
import { GreenNotify } from "../../helper/helper";

const Quotes = () => {
  const [isloading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState([]);
  const [getServiceapi, setGetServiceApi] = useState(false);

  const getQuotes = () => {
    let getRes = (res) => {
      console.log("res of get response", res);
      setQuotes(res?.data?.data);
    };

    callApi("GET", routes.getAllQuotes, null, setIsLoading, getRes, (error) => {
      console.log("error", error);
    });
  };

  const deleteQuote = (id) => {
    setGetServiceApi(false);
    let getRes = (res) => {
      console.log("res of deleteQuote", res);
      GreenNotify("Quote is deleted successfully");
      setGetServiceApi(true);
    };

    callApi(
      "DELETE",
      `${routes.deleteQuote}/${id}`,
      null,
      setIsLoading,
      getRes,
      (error) => {
        console.log("error", error);
      }
    );
  };

  useEffect(() => {
    getQuotes();
  }, [getServiceapi]);

  const columns = [
    {
      title: "Author",
      dataIndex: "author",
      className: "role-name-column-header",
    },
    {
      title: "Quote",
      dataIndex: "quote",
      align: "center",
      className: "type-name-column-header",
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

  const data = quotes?.map((item, index) => {
    return {
      key: index,
      author: item?.author,
      quote: item?.quote,
      edit: (
        <div
          onClick={() => navigate("/editquote", { state: { item: item } })}
          style={{ cursor: "pointer" }}
        >
          <img src={editIcon} alt="editIcon" />
        </div>
      ),
      delete: (
        <div
          onClick={() => deleteQuote(item?._id)}
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
        <h1>Quotes</h1>
        <div
          onClick={() => navigate("/editmodal")}
          className="server-roles-add-btn"
        >
          <img src={addIcon} alt="" />
          <p>Add New Policy</p>
        </div>
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

export default Quotes;

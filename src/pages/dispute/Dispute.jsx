import React, { useState, useEffect } from "react";
import { Breadcrumb, Table, Image } from "antd";
import {
  crossIcon,
  disputeIcon,
  homeIcon,
  redTrash,
  trueIcon,
} from "../../assets";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import Loader from "../../components/loader/loader";
import EvidenceModal from "../../components/evidencemodal/EvidenceModal";

const Dispute = () => {
  const [users, setUsers] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [updateApi, setUpdateApi] = useState(false);

  const getallDispute = () => {
    let getRes = (res) => {
      console.log("res of getAllDisputest", res);
      setUsers(res?.data?.data);
    };

    callApi(
      "GET",
      routes.getallDispute,
      null,
      setIsLoading,
      getRes,
      (error) => {
        console.log("error", error);
      }
    );
  };

  const deleteDispute = (id) => {
    setUpdateApi(false);
    let getRes = (res) => {
      console.log("res of deleteDispute", res);
      setUpdateApi(true);
    };

    callApi(
      "DELETE",
      `${routes.deleteDispute}/${id}`,
      null,
      setIsLoading,
      getRes,
      (error) => {
        console.log("error", error);
      }
    );
  };

  useEffect(() => {
    getallDispute();
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
      title: "Evidence",
      dataIndex: "evidence",
      align: "center",
      className: "action-column-header",
    },
    {
      title: "Seen",
      dataIndex: "seen",
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
      evidence: (
        <div className="product-list-image">
          <>
            <EvidenceModal evidence={item?.evidence} />
            {console.log("imageeeeeeeeeeeee", item?.evidence)}
          </>
        </div>
      ),
      seen: (
        <div className="server-roles-trash-btn">
          <img src={item?.isSeen ? trueIcon : crossIcon} alt="" />
        </div>
      ),
      delete: (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => deleteDispute(item?._id)}
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
          <img src={disputeIcon} alt="home-icon" />
        </div>
        <Breadcrumb.Item>Dispute</Breadcrumb.Item>
      </Breadcrumb>
      <div className="configure-server-roles-main-heading-container">
        <h1>Disputes</h1> <div></div>
      </div>
      <div className="server-roles-tb-main-container">
        <Table
          rowClassName={getRowClassName}
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 5 }}
          className="ant-table-wrapper .ant-table-thead"
        ></Table>
      </div>
    </div>
  );
};

export default Dispute;

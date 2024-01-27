import React, { useState, useEffect } from "react";
import "./products.css";
import { Breadcrumb, Button, Select, Image } from "antd";
import { addIcon, editIcon, homeIcon, redTrash } from "../../assets";
import { Table } from "antd";
import ModalAddProduct from "../../components/ModalAddProduct/modalAddProduct";
import routes from "../../api/routes";
import { callApi } from "../../api/apiCaller";
import Loader from "../../components/loader/loader";
import { useDispatch } from "react-redux";
import { productItem } from "../../redux/userDataSlice";
// import DescriptionModal from "../../components/descriptionModal/descriptionModal";
import moment from "moment/moment";

const Products = () => {
  const dispatch = useDispatch();
  const [isloading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState();
  const [addProduct, setAddProduct] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalDes, setShowModalDes] = useState(false);
  const [pDescription, setPdescription] = useState("");
  const [getProduct, setGetProduct] = useState(false);
  const getProducts = () => {
    let getRes = (res) => {
      setProducts(res?.data);
      // console.log("res of get products", res);
      // setShowModal(false);
    };

    callApi("GET", routes.getProducts, null, setIsLoading, getRes, (error) => {
      console.log("error", error);
    });
  };

  const DeleteProduct = (item) => {
    setGetProduct(false);
    let getRes = (res) => {
      //console.log("res of delete product", res);
      setGetProduct(true);
    };

    callApi(
      "DELETE",
      `${routes.deleteProduct}/${item?._id}`,
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
      title: "Title",
      dataIndex: "title",
      className: "role-name-column-header",
    },
    {
      title: "Description",
      dataIndex: "description",
      align: "center",
      className: "type-name-column-header",
      width: 200,
      // render: (text) => <span style={{ color: "#34ADF4" }}>{text}</span>,
    },

    {
      title: "Quantity",
      dataIndex: "quantity",
      align: "right",
      className: "action-column-header",
    },
    {
      title: "Sale Price",
      dataIndex: "salePrice",
      align: "right",
      className: "action-column-header",
    },
    {
      title: "Price",
      dataIndex: "price",
      align: "right",
      className: "action-column-header",
    },

    {
      title: "Image",
      dataIndex: "image",
      align: "right",
      className: "action-column-header",
    },

    {
      title: "Delete",
      dataIndex: "delete",
      align: "right",
      className: "action-column-header",
    },
    {
      title: "Edit",
      dataIndex: "edit",
      align: "right",
      className: "action-column-header",
    },
  ];

  //   Row Data
  const data = products.map((item, index) => {
    return {
      key: index,
      title: item?.title,

      description: (
        <div>
          <p style={{ fontSize: "12px" }}>
            {item?.description.length > 10
              ? item?.description.substring(0, 30) + "..."
              : item?.description}{" "}
            <span
              onClick={() => {
                setShowModalDes(true);
                setPdescription(item?.description);
              }}
              style={{ color: "#34adf4", cursor: "pointer", fontWeight: 600 }}
            >
              {" "}
              See More{" "}
            </span>
          </p>
        </div>
      ),
      quantity: item?.qty,
      salePrice: `$${item?.salePrice ? item?.salePrice : item?.price}`,
      price: `$${item?.price}`,
      image: (
        <div className="product-list-image">
          <Image width={60} src={item?.image} />
        </div>
      ),
      delete: (
        <div
          onClick={() => DeleteProduct(item)}
          className="server-roles-trash-btn"
        >
          <img src={redTrash} alt="" />
        </div>
      ),
      edit: (
        <div
          onClick={() => {
            setProduct(item);
            // dispatch(productItem(item));
            setShowModal(true);
            setAddProduct(false);
          }}
          className="product-list-edit-icon"
        >
          <img src={editIcon} />
        </div>
      ),
    };
  });

  useEffect(() => {
    getProducts();
  }, [showModal, getProduct]);

  const getRowClassName = (record, index) => {
    if (index % 2 === 0) {
      return "server-role-even-row";
    }
    return "server-role-odd-row";
  };
  return (
    <div className="admin-products-main-container">
      {showModal && (
        <ModalAddProduct
          showModal={showModal}
          setShowModal={setShowModal}
          item={product}
          setIsLoading={setIsLoading}
          addProduct={addProduct}
          setAddProduct={setAddProduct}
        />
      )}
      {/* {showModalDes && (
        <DescriptionModal
          showModalDes={showModalDes}
          setShowModalDes={setShowModalDes}
          description={pDescription}
        />
      )} */}
      <Loader loading={isloading} />
      <Breadcrumb separator=">" className="bread-crumb">
        <div className="configure-server-home-icon">
          <img src={homeIcon} alt="home-icon" />
        </div>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Products</Breadcrumb.Item>
      </Breadcrumb>
      <div className="configure-server-roles-main-heading-container">
        <h1>Products</h1>
        <div
          onClick={() => {
            setAddProduct(true);
            setShowModal(true);
          }}
          className="server-roles-add-btn"
        >
          <img src={addIcon} alt="" />
          <p>Add New Product</p>
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

export default Products;

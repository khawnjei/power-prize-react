import React, { useState, useRef } from "react";
import "./modalAddProduct.css";
import { Button, Modal, Input, InputNumber, Checkbox, Image } from "antd";
import { addIcon, editIcon } from "../../assets";
import { useSelector } from "react-redux";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import { upload } from "../../helper/helper";
const ModalAddProduct = ({
  setShowModal,
  showModal,
  item,
  setIsLoading,
  addProduct,
  setAddProduct,
}) => {
  const [title, setTitle] = useState(addProduct ? "" : item?.title);
    const [description, setDescription] = useState(
      addProduct ? "" : item?.description
    );
  const [count, setCount] = useState(addProduct ? 0 : item?.qty);
  const [price, setPrice] = useState(addProduct ? 0 : item?.price);
  const fileInputRef = useRef(null);

  const [salePrice, setSalePrice] = useState(
    addProduct ? 0 : item?.salePrice ? item?.salePrice : 0
  );
  const [isSale, setIsSale] = useState(item?.isSale);
  const [image, setImage] = useState(addProduct ? "" : item?.image);
  const onChange = (e) => {
    setIsSale(e.target.checked);
    console.log(`Checkbox checked: ${e.target.checked}`);
  };

  const pickImageFile = () => {
    fileInputRef.current.click();
  };

  const dummyImage =
    "https://novathreadbucket.s3.amazonaws.com/nova-app-1685176470232-dummy.PNG";
  //console.log("add product", addProduct);

  const handleFileChange = (event) => {
    const fileList = event.target.files;

    // Perform operations with the selected file(s)
    console.log(fileList);
  };

  const createProduct = () => {
    let getRes = (res) => {
      console.log("res of create product", res);
      setShowModal(false);
      setAddProduct(false);
    };

    let body = {
      title: title,
      description: description,
      image: image,
      isSale: isSale,
      salePrice: salePrice,
      price: price,
      qty: count,
    };

    callApi(
      "POST",
      routes.createProduct,
      body,
      setIsLoading,
      getRes,
      (error) => {
        console.log("error", error);
      }
    );
  };

  const updateProduct = () => {
    let getRes = (res) => {
      // console.log("res of update product", res);
      setShowModal(false);
    };

    let body = {
      title: title,
      description: description,
      image: image,
      isSale: isSale,
      salePrice: salePrice,
      price: price,
      qty: count,
    };

    callApi(
      "PATCH",
      `${routes.upDateProduct}/${item?._id}`,
      body,
      setIsLoading,
      getRes,
      (error) => {
        console.log("error", error);
      }
    );
  };
  //   console.log("item", title1);
  return (
    <div className="add-product-modal-main-container">
      <div className="add-product-modal-container">
        <div style={{ marginTop: "5rem" }}></div>
        <div
          style={{ marginBottom: "2rem" }}
          className="add-product-modal-input-title"
        >
          <h2>Title</h2>
          <Input
            value={title}
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value);
              // console.log("onchange", { ...product, title: e.target.value });
              // setProduct({ ...product, title: e.target.value });
            }}
          />
        </div>

        <div
          style={{ marginBottom: "2rem" }}
          className="add-product-modal-input-title"
        >
          <h2>Description</h2>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
        </div>

        <div
          style={{ marginBottom: "2rem" }}
          className="add-product-modal-input-title"
        >
          <h2>Quantity</h2>
          <InputNumber
            value={count}
            onChange={(e) => setCount(e)}
            min={0}
            placeholder="Quantity"
          />
        </div>

        <div
          style={{ marginBottom: "2rem" }}
          className="add-product-modal-input-title"
        >
          <h2> Price</h2>
          <div className="add-product-modal-amount-container">
            <InputNumber
              value={price}
              onChange={(e) => {
                setPrice(e);
              }}
              prefix="$"
              min={0}
              placeholder="00.00"
            />
          </div>
        </div>

        <div
          style={{ marginBottom: "2rem" }}
          className="add-product-modal-input-title"
        >
          <Checkbox onChange={onChange}>Is Sale?</Checkbox>
        </div>

        {isSale && (
          <div
            style={{ marginBottom: "2rem" }}
            className="add-product-modal-input-title"
          >
            <h2> Sale Price</h2>
            <div className="add-product-modal-amount-container">
              <InputNumber
                value={salePrice}
                onChange={(e) => setSalePrice(e)}
                prefix="$"
                min={0}
                placeholder="00.00"
              />
            </div>
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }} // Hide the file input
          onChange={upload((url) => setImage(url), setIsLoading)}
        />
        <div
          onClick={pickImageFile}
          style={{ marginBottom: "2rem" }}
          className="add-product-modal-input-title"
        >
          <h2>Image</h2>
          <div className="add-product-modal-image">
            <img src={image ? image : dummyImage} alt="" />
          </div>
        </div>
        <div className="modal-btn-container"></div>
        <div style={{ marginBottom: "3rem" }}>
          <Button
            onClick={() => {
              setShowModal(false);
            }}
            type="default"
            danger
          >
            Cancel
          </Button>
          {addProduct ? (
            <Button
              onClick={createProduct}
              style={{ marginLeft: "2rem" }}
              type="primary"
            >
              Add Product
            </Button>
          ) : (
            <Button
              onClick={updateProduct}
              style={{ marginLeft: "2rem" }}
              type="primary"
            >
              UpDate
            </Button>
          )}
        </div>
      </div>
    </div>

    // <div className="add-product-modal-main-container">

    // </div>
  );
};

export default ModalAddProduct;

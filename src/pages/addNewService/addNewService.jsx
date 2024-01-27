import React, { useRef, useState } from "react";
import "./addNewService.css";
import {
  Breadcrumb,
  Table,
  Input,
  Checkbox,
  Select,
  InputNumber,
  Button,
} from "antd";
import { homeIcon, redTrash } from "../../assets";
import { GreenNotify, RedNotify, upload } from "../../helper/helper";
import Loader from "../../components/loader/loader";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;
const AddNewService = () => {
  const navigate = useNavigate();
  const [isloading, setIsLoading] = useState(false);
  const [gender, setGender] = useState("male");
  const [special, setSpecial] = useState(false);
  const [optionTitle, setOptionTitle] = useState("");
  const [title, setTitle] = useState("");
  const [des1Title, setDes1Title] = useState("");
  const [des1, setDes1] = useState("");
  const [descriptions, setDescriptions] = useState([]);
  const [options, setOptions] = useState([]);
  const [count, setCount] = useState(0);
  const fileInputRef = useRef(null);
  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);
  const [images, setImages] = useState([]);
  let dummyImage =
    "https://novathreadbucket.s3.amazonaws.com/nova-app-1685176470232-dummy.PNG";
  const [image, setImage] = useState(dummyImage);
  const [image1, setImage1] = useState(dummyImage);

  const pickImageFile = () => {
    fileInputRef.current.click();
  };
  const pickImageFile1 = () => {
    fileInputRef1.current.click();
  };

  const onChange = (e) => {
    setSpecial(e.target.checked);
  };
  const handleChange = (value) => {
    setGender(value);
  };

  const addDescription = () => {
    let arr = [];
    arr = [...descriptions, { title: des1Title, decription: des1 }];
    images.push(image1);
    setDescriptions(arr);
    setDes1Title("");
    setDes1("");
    setImage1("");
    console.log("arr", arr, images);
  };

  const addOption = () => {
    let arr = [];
    arr = [...options, { name: optionTitle, price: count }];
    setOptions(arr);
    setCount(0);
    setOptionTitle("");
  };

  const createService = () => {
    if (title == "") return RedNotify("Enter Title of service");
    if (image == "") return RedNotify("Select BackGround Image");
    if (descriptions.length == 0)
      return RedNotify("Enter your service Description");
    if (images.length == 0) return RedNotify("Select images for description");
    if (options.length == 0) return RedNotify("Select options");
    let getRes = (res) => {
      if (res.status == 201) {
        GreenNotify("Service Created Successfully");
        navigate("/services");
      } else {
        RedNotify(res.message);
      }
      console.log("res of create service", res);
    };

    let body = {
      title: title,
      special: special,
      type: gender,
      backgroundphoto: image,
      photos: images,
      description: descriptions,
      options: options,
    };

    callApi(
      "POST",
      routes.createService,
      body,
      setIsLoading,
      getRes,
      (error) => {
        console.log("error", error);
      }
    );
  };

  return (
    <div className="admin-products-main-container">
      <Loader loading={isloading} />
      <Breadcrumb separator=">" className="bread-crumb">
        <div className="configure-server-home-icon">
          <img src={homeIcon} alt="home-icon" />
        </div>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Services</Breadcrumb.Item>
        <Breadcrumb.Item>Add new Service</Breadcrumb.Item>
      </Breadcrumb>
      <div className="configure-server-roles-main-heading-container">
        <h1>Add New Service</h1>
        <div></div>
      </div>
      <div className="add-service-input-main-container">
        <h3>Title</h3>:
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ maxWidth: "50%", marginLeft: "2rem" }}
          placeholder="Service title"
        />
      </div>
      <div className="add-service-input-main-container">
        <h3>Special</h3>:{" "}
        <Checkbox
          style={{ maxWidth: "50%", marginLeft: "2rem" }}
          onChange={onChange}
        ></Checkbox>
      </div>
      <div className="add-service-input-main-container">
        <h3>Gender</h3>:{" "}
        <Select
          defaultValue="male"
          style={{
            width: 220,
            marginLeft: "2rem",
          }}
          onChange={handleChange}
          options={[
            {
              value: "male",
              label: "Male",
            },
            {
              value: "female",
              label: "Female",
            },
            {
              value: "other",
              label: "Other",
            },
          ]}
        />
      </div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }} // Hide the file input
        onChange={upload((url) => setImage(url), setIsLoading)}
      />

      <input
        type="file"
        ref={fileInputRef1}
        style={{ display: "none" }} // Hide the file input
        onChange={upload((url) => setImage1(url), setIsLoading)}
      />

      <div className="add-service-input-main-container">
        <h3>Background Image</h3>:{" "}
        <div onClick={pickImageFile} className="add-service-back-ground-image">
          <img src={image} alt="image" />
        </div>
      </div>
      <div className="description-title-add-service">
        <h1>Description</h1>
      </div>

      <div className="add-service-option-main-container">
        <div style={{ width: "80%" }}>
          <div className="add-service-input-main-container">
            <h3>Title</h3>:
            <Input
              value={des1Title}
              onChange={(e) => setDes1Title(e.target.value)}
              style={{ maxWidth: "50%", marginLeft: "2rem" }}
              placeholder="Title "
            />
          </div>
          <div className="add-service-input-main-container">
            <h3>Description</h3>:
            <TextArea
              value={des1}
              onChange={(e) => setDes1(e.target.value)}
              rows={8}
              style={{ maxWidth: "50%", marginLeft: "2rem" }}
              placeholder="Description"
            />
          </div>
          <div className="add-service-input-main-container">
            <h3>Image</h3>:{" "}
            <div
              onClick={pickImageFile1}
              className="add-service-back-ground-image"
            >
              <img src={image1 == "" ? dummyImage : image1} alt="image1" />
            </div>
          </div>
        </div>

        <div className="add-cart-show-description-container">
          {descriptions.length !== 0 ? (
            descriptions.map((item) => (
              <div>
                <h1>{item.title}</h1>
                <p>{item?.decription}</p>
              </div>
            ))
          ) : (
            <h2 style={{ color: "red" }}>No description is added</h2>
          )}
          {images.map((item) => (
            <img src={item} alt="image" />
          ))}
        </div>
      </div>

      <div className="add-service-input-main-container">
        <Button
          disabled={descriptions.length > 1 ? true : false}
          onClick={addDescription}
          type="primary"
        >
          {descriptions.length >= 1
            ? "Add More Description"
            : "Add Description"}
        </Button>
      </div>

      <div className="description-title-add-service">
        <h1>Options</h1>
      </div>

      <div className="add-service-option-main-container">
        <div style={{ width: "60%" }}>
          <div className="add-service-input-main-container">
            <h3>Name</h3>:
            <Input
              value={optionTitle}
              onChange={(e) => setOptionTitle(e.target.value)}
              style={{ maxWidth: "100%", marginLeft: "2rem" }}
              placeholder="Title for description"
            />
          </div>
          <div className="add-service-input-main-container">
            <h3>Price</h3>:
            <InputNumber
              style={{ marginLeft: "3rem", width: "100%" }}
              value={count}
              onChange={(e) => {
                setCount(e);
              }}
              prefix="$"
              min={0}
              placeholder="00.00"
            />
          </div>
          <div className="add-service-input-main-container">
            <Button onClick={addOption} type="primary">
              {options.length >= 1 ? "Add More Option" : "Add Option"}
            </Button>
          </div>
        </div>

        <div className="add-new-service-option-show-container">
          {options.length !== 0 ? (
            options.map((item) => (
              <div className="add-new-service-option-container">
                <h1>{item.name}</h1>
                <p>${item.price}</p>
              </div>
            ))
          ) : (
            <h1 style={{ color: "red" }}>No Option is add</h1>
          )}
        </div>
      </div>

      <Button type="primary" onClick={createService}>
        Create Service
      </Button>
      <div style={{ marginBottom: "5rem" }}></div>
    </div>
  );
};

export default AddNewService;

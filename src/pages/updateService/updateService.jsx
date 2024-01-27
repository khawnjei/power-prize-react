import React, { useState, useRef } from "react";
import Loader from "../../components/loader/loader";
import {
  Breadcrumb,
  Table,
  Input,
  Checkbox,
  Select,
  InputNumber,
  Button,
  Image,
} from "antd";
import { homeIcon } from "../../assets";
import { useLocation, useNavigate } from "react-router-dom";
import { GreenNotify, upload } from "../../helper/helper";
import { callApi } from "../../api/apiCaller";
import routes from "../../api/routes";

const { TextArea } = Input;
const UpdateService = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const item = location?.state?.item;
  // console.log("date", item);
  const [isloading, setIsLoading] = useState(false);
  const [gender, setGender] = useState(item.type);
  const [special, setSpecial] = useState(item?.special);
  const [optionTitle, setOptionTitle] = useState("");
  const [title, setTitle] = useState(item?.title);
  const [des1Title, setDes1Title] = useState("");

  const [des1, setDes1] = useState("");
  const [descriptions, setDescriptions] = useState(item?.description);
  const [options, setOptions] = useState(item?.options);
  const [count, setCount] = useState(0);
  const fileInputRef = useRef(null);
  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);
  const [images, setImages] = useState(item?.photos);
  let dummyImage =
    "https://novathreadbucket.s3.amazonaws.com/nova-app-1685176470232-dummy.PNG";
  const [image, setImage] = useState(
    item?.backgroundphoto ? item?.backgroundphoto : dummyImage
  );
  const [image1, setImage1] = useState(dummyImage);

  const pickImageFile = () => {
    fileInputRef.current.click();
  };
  const pickImageFile1 = (i) => {
    i == 0 ? fileInputRef1.current.click() : fileInputRef2.current.click();
  };

  const onChange = (e) => {
    setSpecial(e.target.checked);
  };
  const handleChange = (value) => {
    setGender(value);
  };

  const updateImage1 = (url) => {
    images[0] = url;
  };
  const updateImage2 = (url) => {
    images[1] = url;
  };

  const addDescription = () => {
    let arr = [];
    arr = [...descriptions, { title: des1Title, decription: des1 }];

    setDescriptions(arr);
    setDes1Title("");
    setDes1("");

    console.log("arr", arr, images);
  };

  const addOption = () => {
    let arr = [];
    arr = [...options, { name: optionTitle, price: count }];
    setOptions(arr);
    setCount(0);
    setOptionTitle("");
  };

  const updateService = () => {
    let getRes = (res) => {
      console.log("res of update Service", res);
      GreenNotify("Service is updated successfully");
      navigate("/services");
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
      "PATCH",
      `${routes.updateService}/${item?._id}`,
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
        <Breadcrumb.Item>update Service</Breadcrumb.Item>
      </Breadcrumb>
      <div className="configure-server-roles-main-heading-container">
        <h1>Update Service</h1>
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
          //   value={special}
          defaultChecked={special}
          style={{ maxWidth: "50%", marginLeft: "2rem" }}
          onChange={onChange}
        ></Checkbox>
      </div>
      <div className="add-service-input-main-container">
        <h3>Gender</h3>:{" "}
        <Select
          defaultValue={gender}
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
        onChange={upload((url) => updateImage1(url), setIsLoading)}
      />

      <input
        type="file"
        ref={fileInputRef2}
        style={{ display: "none" }} // Hide the file input
        onChange={upload((url) => updateImage2(url), setIsLoading)}
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
          {descriptions?.map((item, n) => (
            <>
              <div className="add-service-input-main-container">
                <h3>Title</h3>:
                <Input
                  value={item.title}
                  onChange={(e) =>
                    setDescriptions(
                      descriptions.map((v, i) =>
                        i == n ? { ...v, title: e.target.value } : v
                      )
                    )
                  }
                  style={{ maxWidth: "50%", marginLeft: "2rem" }}
                  placeholder="Title "
                />
              </div>
              <div className="add-service-input-main-container">
                <h3>Description</h3>:
                <TextArea
                  value={item?.decription}
                  onChange={(e) =>
                    setDescriptions(
                      descriptions.map((v, i) =>
                        i == n ? { ...v, decription: e.target.value } : v
                      )
                    )
                  }
                  rows={8}
                  style={{ maxWidth: "50%", marginLeft: "2rem" }}
                  placeholder="Description"
                />
              </div>
            </>
          ))}
          <div className="add-service-input-main-container">
            <h3>Images</h3>:{" "}
            {images?.map((item, i) => (
              <div
                //   onClick={() => updateImage(i)}
                className="add-service-back-ground-image"
              >
                <img
                  onClick={() => pickImageFile1(i)}
                  src={item}
                  alt="image1"
                />
              </div>
            ))}
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
          {images?.map((item) => (
            <Image width={180} src={item} alt="image" />
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
        {options?.map((item, n) => (
          <div style={{ width: "60%" }}>
            <div className="add-service-input-main-container">
              <h3>Name</h3>:
              <Input
                value={item?.name}
                onChange={(e) =>
                  setOptions(
                    options.map((v, i) =>
                      i == n ? { ...v, name: e.target.value } : v
                    )
                  )
                }
                style={{ maxWidth: "100%", marginLeft: "2rem" }}
                placeholder="Title for description"
              />
            </div>
            <div className="add-service-input-main-container">
              <h3>Price</h3>:
              <InputNumber
                style={{ marginLeft: "3rem", width: "100%" }}
                value={item?.price}
                onChange={(e) =>
                  setOptions(
                    options.map((v, i) => (i == n ? { ...v, price: e } : v))
                  )
                }
                prefix="$"
                min={0}
                placeholder="00.00"
              />
            </div>
          </div>
        ))}
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

      <Button onClick={updateService} type="primary">
        Update Service
      </Button>
      <div style={{ marginBottom: "5rem" }}></div>
    </div>
  );
};

export default UpdateService;

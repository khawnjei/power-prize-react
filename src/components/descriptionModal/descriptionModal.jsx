import React, { useState } from "react";
import "./description.css";
import { useLocation } from "react-router-dom";

const DescriptionModal = ({ showModalDes, setShowModalDes, description }) => {
  // const [description, setDescription] = useState(
  //   location?.state?.item?.description
  // );
  // const location = useLocation();

  return (
    <div
      onClick={() => setShowModalDes(false)}
      className="add-product-modal-main-container"
    >
      <div
        style={{ marginTop: "10rem", width: "40rem", height: "30rem" }}
        className="add-product-modal-container product-description-detail"
      >
        <h1>Description</h1>
        <h2>{description}</h2>
      </div>
    </div>
  );
};

export default DescriptionModal;

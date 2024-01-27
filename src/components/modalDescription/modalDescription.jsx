import React from "react";
import "./modalDescription.css";
import { redTrash } from "../../assets";

const ModalDescription = ({
  showModal,
  setShowModal,
  photos,
  description,
  option,
}) => {
  return (
    <div
      onClick={() => setShowModal(!showModal)}
      className="add-product-modal-main-container"
    >
      <div
        style={{ marginTop: "29rem", width: "90rem" }}
        className="add-product-modal-container"
      >
        <h2>Photos</h2>
        <div className="description-modal-photos-container">
          {photos?.map((item, index) => (
            <img key={index} src={item} alt="photos" />
          ))}
        </div>
        <div className="description-modal-description-main-container">
          {description?.map((item) => (
            <>
              <h2>{item?.title}</h2>
              <p>{item?.decription}</p>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModalDescription;

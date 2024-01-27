import React from "react";
import "./optionModal.css";

const OptionModal = ({ showModalOption, setShowModalOption, options }) => {
  return (
    <div
      onClick={() => setShowModalOption(!showModalOption)}
      className="add-product-modal-main-container"
    >
      <div
        style={{ marginTop: "29rem", width: "70rem" }}
        className="add-product-modal-container"
      >
        {options.map((item) => (
          <div className="services-modal-options-main-container">
            <h1>{item?.name}</h1>
            <h1>{item?.time}minute</h1>
            <h1>${item?.price}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptionModal;

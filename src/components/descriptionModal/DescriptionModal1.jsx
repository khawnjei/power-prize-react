import React, { useState } from "react";
import { Modal } from "antd";
import "./descriptionmodal1.css";

const DescriptionModal = ({ description }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <p style={{ fontWeight: "bold" }} onClick={showModal}>
        View
      </p>
      <div>
        <Modal
          style={{ marginTop: "10rem", width: "auto", height: "auto" }}
          width={500}
          title="Description"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>{description}</p>
        </Modal>
      </div>
    </div>
  );
};

export default DescriptionModal;

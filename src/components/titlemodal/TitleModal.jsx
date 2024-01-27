import React, { useState } from "react";
import { Modal } from "antd";

const TermsModal = ({ title }) => {
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
          className="customModal"
          style={{ marginTop: "10rem", width: "40rem", height: "30rem" }}
          title="Title"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>{title}</p>
        </Modal>
      </div>
    </div>
  );
};

export default TermsModal;

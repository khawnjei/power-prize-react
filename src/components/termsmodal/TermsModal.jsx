import React, { useState } from "react";
import { Modal } from "antd";

const TermsModal = ({ terms }) => {
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
          style={{ marginTop: "10rem", width: "auto", height: "auto" }}
          width={500}
          title="Terms"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>{terms}</p>
        </Modal>
      </div>
    </div>
  );
};

export default TermsModal;

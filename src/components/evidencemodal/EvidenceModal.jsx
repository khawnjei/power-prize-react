import React, { useState } from "react";
import { Image, Modal } from "antd";

const EvidenceModal = ({ evidence }) => {
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
  console.log("oiiii", evidence);
  return (
    <div>
      <p style={{ fontWeight: "bold", cursor: "pointer" }} onClick={showModal}>
        View
      </p>
      <div>
        <Modal
          className="customModal"
          style={{ marginTop: "10rem", width: "40rem", height: "30rem" }}
          title="Evidence"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {evidence.map((item, index) => (
            <Image key={index} width={50} src={item} alt="Evidence" />
          ))}
        </Modal>
      </div>
    </div>
  );
};

export default EvidenceModal;

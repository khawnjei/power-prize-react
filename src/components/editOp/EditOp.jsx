import React from "react";
import "./editop.css";
import { useState } from "react";
import Input from "antd/es/input/Input";

const EditOp = () => {
  const [description, setDescription] = useState("");
  return (
    <div
      style={{ marginBottom: "2rem" }}
      //   className="add-product-modal-input-title"
    >
      <h2>Description</h2>
      <Input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
    </div>
  );
};

export default EditOp;

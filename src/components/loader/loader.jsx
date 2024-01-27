import React from "react";
import { Modal } from "antd";
import { BallTriangle } from "react-loader-spinner";

const Loader = ({ loading }) => {
  return (
    <Modal
      open={loading}
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}
      closeIcon={<div></div>}
      style={{
        marginTop: "5rem",
        width: "auto",
        marginLeft: 0,
        marginRight: 0,
      }}
      width={200}
      centered
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "16rem",
        }}
      >
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#16375a"
          ariaLabel="ball-triangle-loading"
          wrapperClass={{}}
          wrapperStyle=""
          visible={true}
        />
        <h3>Loading..</h3>
      </div>
    </Modal>
  );
};

export default Loader;

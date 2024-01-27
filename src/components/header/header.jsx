import React from "react";
import { Col, Row } from "antd";
import "./header.css";
import { searchIcon } from "../../assets";

const Header2 = () => {
  return (
    <Row className="layout-header">
      <Col span={24}>
        <Row justify={"space-between"}>
          <Col>
            <Row align={"middle"} className="layout-header-search-container">
              <img src={searchIcon} />
              <input placeholder="search anything..." type={"text"} />
            </Row>
          </Col>
          <Col span={12}></Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Header2;

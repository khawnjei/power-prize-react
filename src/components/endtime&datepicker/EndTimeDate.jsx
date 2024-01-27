import React from "react";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
const onChange = (value, dateString) => {
  console.log("Selected Time: ", value);
  console.log("Formatted Selected Time: ", dateString);
};
const onOk = (value) => {
  console.log("onOk: ", value);
};

const dateFormat = "YYYY/MM/DD hh:mm";

const EndTimeDate = ({ value }) => {
  return (
    <Space direction="vertical" size={12}>
      <DatePicker
        showTime
        defaultValue={dayjs(value, dateFormat)}
        format="YYYY-MM-DD hh:mm"
        onChange={onChange}
        onOk={onOk}
      />
    </Space>
  );
};

export default EndTimeDate;

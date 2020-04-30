import LoadingOutlined from "@ant-design/icons/LoadingOutlined";
import ExclamationCircleFilled from "@ant-design/icons/ExclamationCircleFilled";
import CloseCircleFilled from "@ant-design/icons/CloseCircleFilled";
import CheckCircleFilled from "@ant-design/icons/CheckCircleFilled";
import InfoCircleFilled from "@ant-design/icons/InfoCircleFilled";
import "./toast.css";
import React from "react";

const getIcon = (icon_type) => {
  switch (icon_type) {
    case "info":
      return <InfoCircleFilled className="notice-info" />;

    case "success":
      return <CheckCircleFilled className="notice-success" />;

    case "warning":
      return <ExclamationCircleFilled className="notice-warning" />;

    case "error":
      return <CloseCircleFilled className="notice-error" />;

    case "loading":
      return <LoadingOutlined className="notice-loading" />;

    default:
      return null;
  }
};

export default getIcon;

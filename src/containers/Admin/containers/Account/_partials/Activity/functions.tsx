import React from "react";
import { Button, Space } from "antd";
import { ImgPlaceholderStyled } from "../../../helpers";
import numberWithCommas from "../../../../../../utils/numberFormatter";

const columns: any = ({
  toggleViewOrganizationModal,
  setCurrentOrganization,
}) => {
  return [
    {
      title: "S/N",
      dataIndex: "rank",
      key: "rank",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "CEO/Founder",
      dataIndex: "ceo_name",
      key: "ceo_name",

      render: (record, text) => (
        <Space size="middle" style={{ display: "flex", alignItems: "center" }}>
          {record && record.avatar ? (
            <div
              style={{
                width: "30px",
                height: "30px",
              }}
            >
              <img
                src={record.avatar}
                alt="Profile"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50px",
                }}
              />
            </div>
          ) : (
            <ImgPlaceholderStyled className="img_placeholder" />
          )}
          <span>{record && record.name}</span>
        </Space>
      ),
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "Sectors",
      dataIndex: "sectors",
      key: "sectors",
    },
    {
      title: "Employees",
      dataIndex: "employees",
      key: "employees",
    },
    {
      title: "Funding (₦)",
      dataIndex: "funding",
      key: "funding",

      render: (record, key) => {
        // let result = record ? record.split("₦") : [];

        return (
          // <span>{`${result.length ? numberWithCommas(result[1]) : ""}`}</span>
          <span>{numberWithCommas(record)}</span>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      key: "action",
      align: "center",

      render: (record, key) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              onClick={() => {
                setCurrentOrganization(record);
                toggleViewOrganizationModal();
              }}
            >
              View
            </Button>
          </Space>
        );
      },
    },
  ];
};

export default columns;

import React from "react";
import { Space } from "antd";
import { ViewProfileBtnStyled } from "./Dashboard/styled";
import { Link } from "react-router-dom";

// Function that Generate Table Columns

const createTableColumns = () => {
  const columns = [
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Ceo/Founder",
      dataIndex: "ceo_name",
      key: "ceo_name",
      render: (record, text) => (
        <Space size="middle" style={{ display: "flex", alignItems: "center" }}>
          <>
            {record.avatar ? (
              <img
                src={record.avatar}
                alt="Profile"
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50px",
                }}
              />
            ) : (
              <p
                className="img_placeholder"
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50px",
                  background: "#e6e6e6",
                  // marginRight: "10px",
                  marginBottom: 0,
                }}
              ></p>
            )}
            <span>{record.name}</span>
          </>
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
    // {
    //   title: "Market Cap",
    //   dataIndex: "market_cap",
    //   key: "market_cap",
    // },
    {
      title: "Employees",
      dataIndex: "employees",
      key: "employees",
    },
    {
      title: "Funding",
      dataIndex: "funding",
      key: "funding",
    },
    {
      // title: "Action",
      key: "action",
      render: (record, key) => {
        return (
          <Space size="middle">
            <ViewProfileBtnStyled>
              <Link to={`/d/profile/${record.id}`}>View Profile</Link>
            </ViewProfileBtnStyled>
          </Space>
        );
      },
    },
  ];

  return columns;
};

const createDataSource = organizationList => {
  const dataSource = organizationList.map((org, key) => {
    return {
      key: key,
      rank: key + 1,
      company: org.name,
      ceo_name: { name: org.ceo_name, avatar: org.ceo_image_url },
      state: org.state,
      sectors: org.sector,
      market_cap: org.market_cap,
      employees: org.num_of_employees,
      funding: org.funding,
      id: org.id,
    };
  });

  return dataSource;
};

export { createTableColumns, createDataSource };

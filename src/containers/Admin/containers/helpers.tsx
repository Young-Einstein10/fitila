import React, { Fragment } from "react";
import { Space, Tooltip } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { ViewProfileBtnStyled } from "./Dashboard/styled";
import { Link } from "react-router-dom";
import { ActionButtonStyled } from "../../Styles";
import styled from "styled-components";
import numberWithCommas from "../../../utils/numberFormatter";

// Function that Generate Table Columns

export const DeleteButton = props => (
  <Tooltip title="Delete">
    <ActionButtonStyled
      {...props}
      danger
      type="default"
      children={<DeleteFilled height="1.2em" width="1.2em" />}
    />
  </Tooltip>
);

export const EditButton = props => (
  <Tooltip title="Edit">
    <ActionButtonStyled
      {...props}
      type="default"
      children={<EditFilled height="1.2em" width="1.2em" />}
    />
  </Tooltip>
);

const ImgPlaceholderStyled = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 50px;
  background: #e7833b;
  margin-bottom: 0;
`;

const createTableColumns = (
  handleEdit?: (record: any) => void,
  handleDelete?: (record: any) => void,
  isAdmin?: boolean,
  isOrganizationRoute?: boolean
) => {
  const columns: any = [
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
      title: "Funding (₦)",
      dataIndex: "funding",
      key: "funding",
      render: (record, key) => {
        let result = record ? record.split("₦") : [];

        return (
          <span>{`${result.length ? numberWithCommas(result[1]) : ""}`}</span>
        );
      },
    },
    {
      title: "Actions",
      key: "action",
      align: "center",
      render: (record, key) => {
        return (
          <Space size="middle">
            <ViewProfileBtnStyled>
              <Link to={`/d/profile/${record.id}`}>View Profile</Link>
            </ViewProfileBtnStyled>
            {/* <Button onClick={() => handleEdit(record)}>
              <EditFilled
                style={{
                  width: "1.2rem",
                  height: "1.2rem",
                }}
              />
            </Button> */}
            {/* <Button onClick={() => handleDelete(record.id)}>
              <DeleteFilled
                style={{
                  width: "1.2rem",
                  height: "1.2rem",
                }}
              />
            </Button> */}
            {isAdmin && isOrganizationRoute ? (
              <Fragment>
                <EditButton onClick={() => handleEdit(record)} />
                <DeleteButton onClick={() => handleDelete(record.id)} />
              </Fragment>
            ) : null}
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
      ...org,
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

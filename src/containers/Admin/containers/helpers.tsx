import React, { Fragment } from "react";
import { Space, Tooltip } from "antd";
import FeatherIcon from "feather-icons-react";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { ViewProfileBtnStyled } from "./Dashboard/styled";
import { Link, NavLink } from "react-router-dom";
import { ActionButtonStyled } from "../../Styles";
import styled from "styled-components";
import numberWithCommas from "../../../utils/numberFormatter";
import { IOrganizationProps } from "../../../context/Organization/types";

const DeleteButton = props => (
  <Tooltip title="Delete">
    <ActionButtonStyled
      {...props}
      danger
      type="default"
      children={<DeleteFilled height="1.2em" width="1.2em" />}
    />
  </Tooltip>
);

const EditButton = props => (
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

// Function that Generate Table Columns
const createTableColumns = (
  handleEdit?: (record: any) => void,
  handleDelete?: (record: any) => void,
  isAdmin?: boolean,
  isOrganizationRoute?: boolean,
  isViewingProfile?: boolean
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
            {/* Render a anchor link if user is viewing a company profile currently, so when View Profile button in SimilarCompanies is clicked, it'll route to the compnay page */}
            {isViewingProfile ? (
              <ViewProfileBtnStyled>
                <a href={`/d/profile/${record.id}`}>View Profile</a>
              </ViewProfileBtnStyled>
            ) : (
              <ViewProfileBtnStyled>
                <Link to={`/d/profile/${record.id}`}>View Profile</Link>
              </ViewProfileBtnStyled>
            )}

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

const createDataSource = (organizationList: IOrganizationProps[]) => {
  const dataSource = organizationList.map((org, key) => {
    return {
      ...org,
      key: org.id,
      rank: key + 1,
      company: org.name,
      ceo_name: { name: org.ceo_name, avatar: org.ceo_image_url },
      state: org.state,
      sectors: org.sector_name || org.sector,
      market_cap: org.market_cap,
      employees: org.num_of_employees,
      funding: org.funding,
      id: org.id,
    };
  });

  return dataSource;
};

const TableOptions = () => (
  <Fragment>
    {/* <NavLink to="#">
      <FeatherIcon size={16} icon="printer" />
      <span>Printer</span>
    </NavLink> */}
    <NavLink to="#">
      <FeatherIcon size={16} icon="book-open" />
      <span>PDF</span>
    </NavLink>
    {/* <NavLink to="#">
      <FeatherIcon size={16} icon="file-text" />
      <span>Google Sheets</span>
    </NavLink> */}
    <NavLink to="#">
      <FeatherIcon size={16} icon="x" />
      <span>Excel (XLSX)</span>
    </NavLink>
    <NavLink to="#">
      <FeatherIcon size={16} icon="file" />
      <span>CSV</span>
    </NavLink>
  </Fragment>
);

export {
  createTableColumns,
  createDataSource,
  TableOptions,
  EditButton,
  DeleteButton,
  ImgPlaceholderStyled,
};

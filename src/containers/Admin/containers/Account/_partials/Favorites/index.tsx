import { Button, Col, Row, Space, Table } from "antd";
import React from "react";
import FeatherIcon from "feather-icons-react";
import { NavLink } from "react-router-dom";
import { Cards } from "../../../../../../components/cards/frame/cards-frame";

const Favorites = () => {
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },

    {
      title: "Orgaanization",
      dataIndex: "organization",
      key: "organization",
    },
    {
      title: "Sector",
      dataIndex: "sector",
      key: "sector",
    },

    {
      title: "Market Cap",
      dataIndex: "market_cap",
      key: "market_cap",
    },

    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <Button type="link" style={{ color: "red" }}>
            Remove
          </Button>
        </Space>
      ),
    },
  ];

  const dataSource = [
    {
      key: "1",
      date: new Date().toDateString(),
      time: new Date().toLocaleTimeString(),
      organization: "Paystack",
      sector: "FinTech",
      market_cap: "$134.5B",
    },
    {
      key: "2",
      date: new Date().toDateString(),
      time: new Date().toLocaleTimeString(),
      organization: "Paystack",
      sector: "FinTech",
      market_cap: "$134.5B",
    },
    {
      key: "3",
      date: new Date().toDateString(),
      time: new Date().toLocaleTimeString(),
      organization: "Paystack",
      sector: "FinTech",
      market_cap: "$134.5B",
    },
    {
      key: "4",
      date: new Date().toDateString(),
      time: new Date().toLocaleTimeString(),
      organization: "Paystack",
      sector: "Technology",
      market_cap: "$134.5B",
    },
    {
      key: "5",
      date: new Date().toDateString(),
      time: new Date().toLocaleTimeString(),
      organization: "Paystack",
      sector: "Technology",
      market_cap: "$134.5B",
    },
  ];

  const content = (
    <>
      <NavLink to="#">
        <FeatherIcon size={16} icon="printer" />
        <span>Printer</span>
      </NavLink>
      <NavLink to="#">
        <FeatherIcon size={16} icon="book-open" />
        <span>PDF</span>
      </NavLink>
      <NavLink to="#">
        <FeatherIcon size={16} icon="file-text" />
        <span>Google Sheets</span>
      </NavLink>
      <NavLink to="#">
        <FeatherIcon size={16} icon="x" />
        <span>Excel (XLSX)</span>
      </NavLink>
      <NavLink to="#">
        <FeatherIcon size={16} icon="file" />
        <span>CSV</span>
      </NavLink>
    </>
  );

  return (
    <Row gutter={15}>
      <Col xs={24}>
        <Cards title="Favorites" more={content}>
          <Table
            className="table-responsive"
            pagination={false}
            dataSource={dataSource}
            columns={columns}
          />
        </Cards>
      </Col>
    </Row>
  );
};

export default Favorites;

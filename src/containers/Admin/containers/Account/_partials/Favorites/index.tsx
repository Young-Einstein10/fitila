import { Button, Col, Row, Space, Table } from "antd";
import React from "react";

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

  return (
    <Row gutter={15}>
      <Col xs={24}>
        <Cards title="Favorites">
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

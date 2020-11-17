import { Col, Row, Table } from "antd";
import React from "react";
import FeatherIcon from "feather-icons-react";
import { NavLink } from "react-router-dom";
import { Cards } from "../../../../../../components/cards/frame/cards-frame";

const Activity = () => {
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
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },

    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
  ];

  const dataSource = [
    {
      key: "1",
      date: new Date().toDateString(),
      time: "02:04 PM WAT",
      action: "You changed your password",
      type: "12, Avennue Rd, lagos",
      location: "12, Avennue Rd, lagos",
    },
    {
      key: "2",
      date: new Date().toDateString(),
      time: "02:04 PM WAT",
      action: "You Logged into",
      type: "12, Avennue Rd, lagos",
      location: "12, Avennue Rd, lagos",
    },
    {
      key: "3",
      date: new Date().toDateString(),
      time: "02:04 PM WAT",
      action: "You changed your password",
      type: "12, Avennue Rd, lagos",
      location: "--",
    },
    {
      key: "4",
      date: new Date().toDateString(),
      time: "02:04 PM WAT",
      action: "You Logged into",
      type: "12, Avennue Rd, lagos",
      location: "12, Avennue Rd, lagos",
    },
    {
      key: "5",
      date: new Date().toDateString(),
      time: "02:04 PM WAT",
      action: "You Logged into",
      type: "12, Avennue Rd, lagos",
      location: "12, Avennue Rd, lagos",
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
        <Cards title="Activities" more={content}>
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

export default Activity;

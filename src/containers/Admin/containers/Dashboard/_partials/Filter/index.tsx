import React from "react";
import { connect } from "react-redux";
import { Row, Col, Dropdown, Button, Menu } from "antd";
import { ReactComponent as FilterOutlined } from "../../../../../../static/svg/filter.svg";
import { ReactComponent as ArrowDown } from "../../../../../../static/svg/arrowDown.svg";

const FilterOption = ({ business }) => {
  const sectorData = (
    <Menu onClick={() => {}}>
      <Menu.Item key="1">Health</Menu.Item>
      <Menu.Item key="2">Agriculture</Menu.Item>
      <Menu.Item key="3">Creatives</Menu.Item>
      <Menu.Item key="4">Education</Menu.Item>
      <Menu.Item key="5">Manufacturers</Menu.Item>
      <Menu.Item key="6">ICT</Menu.Item>
      <Menu.Item key="7">Finance</Menu.Item>
    </Menu>
  );

  const stateData = (
    <Menu onClick={() => {}}>
      <Menu.Item key="11">Lagos</Menu.Item>
      <Menu.Item key="21">Ogun</Menu.Item>
      <Menu.Item key="31">Abuja</Menu.Item>
      <Menu.Item key="41">Kano</Menu.Item>
      <Menu.Item key="51">Kaduna</Menu.Item>
    </Menu>
  );

  const businessData = (
    <Menu onClick={() => {}}>
      {business.organization.map((org, key) => {
        return <Menu.Item key={key}>{org.name}</Menu.Item>;
      })}
    </Menu>
  );

  return (
    <Row
      gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }}
      style={{ padding: "0 1.3rem 1.3rem" }}
    >
      <Col span={6}>
        <Dropdown overlay={businessData}>
          <Button
            style={{
              width: "100%",
              padding: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FilterOutlined style={{ marginRight: "15px" }} /> Filter By
            Organization <ArrowDown style={{ marginLeft: "15px" }} />
          </Button>
        </Dropdown>
      </Col>

      <Col span={6}>
        <Dropdown overlay={stateData}>
          <Button
            style={{
              width: "100%",
              padding: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FilterOutlined style={{ marginRight: "15px" }} /> Filter By States{" "}
            <ArrowDown style={{ marginLeft: "15px" }} />
          </Button>
        </Dropdown>
      </Col>

      <Col span={6}>
        <Dropdown overlay={sectorData}>
          <Button
            style={{
              width: "100%",
              padding: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FilterOutlined style={{ marginRight: "15px" }} /> Filter By Sector{" "}
            <ArrowDown style={{ marginLeft: "15px" }} />
          </Button>
        </Dropdown>
      </Col>
    </Row>
  );
};

const mapStateToProps = state => ({
  business: state.business,
});

export default connect(mapStateToProps)(FilterOption);

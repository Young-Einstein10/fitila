import React from "react";
import { connect } from "react-redux";
import { Row, Col, Dropdown, Button, Menu } from "antd";
import { ReactComponent as FilterOutlined } from "../../../../../../static/svg/filter.svg";
import { ReactComponent as ArrowDown } from "../../../../../../static/svg/arrowDown.svg";

const FilterOption = ({ business }) => {
  const sectorData = (
    <Menu onClick={() => {}}>
      {business.sectors.map((sector, key) => (
        <Menu.Item key={key}>{sector}</Menu.Item>
      ))}
    </Menu>
  );

  const stateData = (
    <Menu onClick={() => {}}>
      {business.states.map((state, key) => (
        <Menu.Item key={key}>{state}</Menu.Item>
      ))}
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
    <Row gutter={[16, 16]} style={{ padding: "0 1.3rem 1.3rem" }}>
      <Col xs={24} sm={24} md={12} lg={8}>
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

      <Col xs={24} sm={24} md={12} lg={8}>
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

      <Col xs={24} sm={24} md={12} lg={8}>
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

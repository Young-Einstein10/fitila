import React from "react";
import { Row, Col, Dropdown, Button, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ReactComponent as FilterOutlined } from "../../../../../../static/svg/filter.svg";
import { ReactComponent as ArrowDown } from "../../../../../../static/svg/arrowDown.svg";

const FilterOption = () => {
  const menu = (
    <Menu onClick={() => {}}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        1st menu item
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        2nd menu item
      </Menu.Item>
      <Menu.Item key="3" icon={<UserOutlined />}>
        3rd menu item
      </Menu.Item>
    </Menu>
  );
  return (
    <Row
      gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }}
      style={{ padding: "0 1.3rem 1.3rem" }}
    >
      <Col span={6}>
        <Dropdown overlay={menu}>
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
        <Dropdown overlay={menu}>
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
        <Dropdown overlay={menu}>
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

export default FilterOption;

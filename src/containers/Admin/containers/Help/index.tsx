import React from "react";
import { Menu, Col, Row, Dropdown, Collapse } from "antd";
import FeatherIcon from "feather-icons-react";
import { UserOutlined } from "@ant-design/icons";
import { Cards } from "../../../../components/cards/frame/cards-frame";
import Heading from "../../../../components/heading/heading";
import { PageHeader } from "../../../../components/page-headers/page-headers";
import { Main } from "../../../AuthLayout/styled";
import { AdminSectionWrapper } from "../../styled";
import { NavLink } from "react-router-dom";
import { TableHeaderButtonStyled } from "../Dashboard/styled";
import { ReactComponent as ArrowDown } from "../../../../static/svg/arrowDown.svg";

const { Panel } = Collapse;

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

const tableHeader = (
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    <span>General</span>
    <Dropdown overlay={menu}>
      <TableHeaderButtonStyled type="ghost" size="middle">
        General <ArrowDown />
      </TableHeaderButtonStyled>
    </Dropdown>
  </div>
);

const text = (
  <p style={{ paddingLeft: 24 }}>
    Nam varius risus, donec sed imperdiet cursus sollicitudin leo. Magna mi
    viverra sit diam posuere porttitor aliquet venenatis elementum. Quis lorem
    nisl vitae nullam eros. Maecenas dui neque ut ultrices consectetur sed orci.
    Quis.
  </p>
);

const Help = () => {
  return (
    <AdminSectionWrapper>
      <div>
        <PageHeader
          title={
            <Heading as="h3" style={{ fontSize: "24px", fontWeight: "bold" }}>
              FAQ's
            </Heading>
          }
          style={{ marginBottom: "0" }}
        />
      </div>

      <Main>
        <Row gutter={24}>
          <Col xs={24}>
            <Cards title={tableHeader} more={content}>
              <Row>
                <Col span={12}>
                  <Collapse accordion bordered={false} defaultActiveKey={["1"]}>
                    {[1, 2, 3, 4, 5, 6].map((_, key) => (
                      <Panel key={key} header="This is panel header 1">
                        {text}
                      </Panel>
                    ))}
                  </Collapse>
                </Col>

                <Col span={12}>
                  <Collapse accordion bordered={false} defaultActiveKey={["1"]}>
                    {[11, 12, 13, 14, 15, 16].map((num, key) => (
                      <Panel key={num} header="This is panel header 1">
                        {text}
                      </Panel>
                    ))}
                  </Collapse>
                </Col>
              </Row>
            </Cards>
          </Col>
        </Row>
      </Main>
    </AdminSectionWrapper>
  );
};

export default Help;

import React from "react";
import { Menu, Col, Row, Dropdown } from "antd";
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

const PrivacyPolicy = () => {
  return (
    <AdminSectionWrapper>
      <div>
        <PageHeader
          title={
            <Heading as="h3" style={{ fontSize: "24px", fontWeight: "bold" }}>
              Privacy Policy
            </Heading>
          }
          style={{ marginBottom: "0" }}
        />
      </div>

      <Main>
        <Row gutter={24}>
          <Col xs={24}>
            <Cards title={tableHeader} more={content}>
              <Col span={12}>
                <div>
                  <p>
                    Blandit tellus, morbi etiam aenean nunc, tristique. Ipsum
                    auctor orci fames enim in. Integer vitae amet etiam
                    pharetra. Sit pellentesque massa hac suspendisse. Nunc urna
                    risus, odio vivamus. Arcu consequat dictum volutpat sit
                    consectetur ultricies arcu. Eget vitae risus ornare commodo
                    consequat ut amet amet. Donec sit quam posuere tempor id nec
                    sed purus. Vestibulum morbi id tincidunt id ullamcorper
                    commodo nunc cursus.
                  </p>
                </div>

                <div>
                  <h3>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  </h3>
                  <p>
                    Duis posuere phasellus sit rutrum. Dignissim dictum sapien
                    vulputate elit. Dignissim nascetur aenean auctor leo. In est
                    blandit neque amet, vulputate viverra vivamus. Netus in
                    neque sed vel gravida nisi, amet nunc. Fusce integer in at
                    dolor scelerisque turpis nam. Tristique sit pellentesque dui
                    sapien, odio scelerisque gravida. A morbi pellentesque quis
                    nullam gravida malesuada tincidunt sed. Non malesuada
                    penatibus purus libero sed vitae pretium pellentesque. Vitae
                    purus justo, leo vitae viverra et. Commodo egestas dui
                    mauris sapien velit suspendisse amet. Viverra cras habitant
                    a purus sed. Quam ultricies faucibus integer tortor nam
                    faucibus. Tincidunt ipsum, rhoncus, vitae et sagittis. Urna
                    sit posuere integer eros auctor eu pellentesque tincidunt
                    vel. Sit mattis est est aliquam. Cras aliquet nulla nunc et
                    mattis id nulla neque enim. Viverra varius diam sit neque
                    mattis est euismod tincidunt. Phasellus adipiscing sed
                    lectus porttitor. Vitae nibh eu arcu, diam mollis. Commodo,
                    ut accumsan erat iaculis a tellus integer orci. Id turpis
                    eget faucibus nec arcu egestas non. Quis sed phasellus
                    ultrices feugiat orci diam duis consectetur. Morbi ultricies
                    platea malesuada elit quis scelerisque amet quis. Pharetra,
                    in duis porttitor consequat consequat.
                  </p>
                </div>
              </Col>

              <Col span={12}>
                <div>
                  <p>
                    Blandit tellus, morbi etiam aenean nunc, tristique. Ipsum
                    auctor orci fames enim in. Integer vitae amet etiam
                    pharetra. Sit pellentesque massa hac suspendisse. Nunc urna
                    risus, odio vivamus. Arcu consequat dictum volutpat sit
                    consectetur ultricies arcu. Eget vitae risus ornare commodo
                    consequat ut amet amet. Donec sit quam posuere tempor id nec
                    sed purus. Vestibulum morbi id tincidunt id ullamcorper
                    commodo nunc cursus.
                  </p>
                </div>

                <div>
                  <h3>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  </h3>
                  <p>
                    Duis posuere phasellus sit rutrum. Dignissim dictum sapien
                    vulputate elit. Dignissim nascetur aenean auctor leo. In est
                    blandit neque amet, vulputate viverra vivamus. Netus in
                    neque sed vel gravida nisi, amet nunc. Fusce integer in at
                    dolor scelerisque turpis nam. Tristique sit pellentesque dui
                    sapien, odio scelerisque gravida. A morbi pellentesque quis
                    nullam gravida malesuada tincidunt sed. Non malesuada
                    penatibus purus libero sed vitae pretium pellentesque. Vitae
                    purus justo, leo vitae viverra et. Commodo egestas dui
                    mauris sapien velit suspendisse amet. Viverra cras habitant
                    a purus sed. Quam ultricies faucibus integer tortor nam
                    faucibus. Tincidunt ipsum, rhoncus, vitae et sagittis. Urna
                    sit posuere integer eros auctor eu pellentesque tincidunt
                    vel. Sit mattis est est aliquam. Cras aliquet nulla nunc et
                    mattis id nulla neque enim. Viverra varius diam sit neque
                    mattis est euismod tincidunt. Phasellus adipiscing sed
                    lectus porttitor. Vitae nibh eu arcu, diam mollis. Commodo,
                    ut accumsan erat iaculis a tellus integer orci. Id turpis
                    eget faucibus nec arcu egestas non. Quis sed phasellus
                    ultrices feugiat orci diam duis consectetur. Morbi ultricies
                    platea malesuada elit quis scelerisque amet quis. Pharetra,
                    in duis porttitor consequat consequat.
                  </p>
                </div>
              </Col>
            </Cards>
          </Col>
        </Row>
      </Main>
    </AdminSectionWrapper>
  );
};

export default PrivacyPolicy;

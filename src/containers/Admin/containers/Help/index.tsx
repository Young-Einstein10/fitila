import React from "react";
import { Row, Collapse, Form, Col, Divider } from "antd";
import { Cards } from "../../../../components/cards/frame/cards-frame";
import Heading from "../../../../components/heading/heading";
import { PageHeader } from "../../../../components/page-headers/page-headers";
import { Main } from "../../../AuthLayout/styled";
import { AdminSectionWrapper } from "../../styled";
import { ReactComponent as PlusIcon } from "../../../../static/svg/plus.svg";
import { CollapseStyled } from "./styled";
import { ButtonStyled, InputStyled } from "../../../Styles";

import "./help.less";

const { Panel } = Collapse;

const tableHeader = (
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    <span>General</span>
  </div>
);

const text = (
  <p>
    Nam varius risus, donec sed imperdiet cursus sollicitudin leo. Magna mi
    viverra sit diam posuere porttitor aliquet venenatis elementum. Quis lorem
    nisl vitae nullam eros. Maecenas dui neque ut ultrices consectetur sed orci.
    Quis.
  </p>
);

const Help = () => {
  const [form] = Form.useForm();

  const handleSubmit = () => {};

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
            <Cards title={tableHeader}>
              <Row gutter={24}>
                <Col xs={24} md={16} lg={12}>
                  <Collapse
                    className="styled-collapse"
                    accordion
                    bordered={false}
                    defaultActiveKey={["1"]}
                    expandIconPosition="right"
                    expandIcon={() => <PlusIcon />}
                  >
                    {[1, 2, 3, 4, 5, 6].map((_, key) => (
                      <Panel
                        key={key + 1}
                        header={
                          <p style={{ marginBottom: 0, fontWeight: 700 }}>
                            A proin dolor at turpis arcu. Lectus interdum purus.
                          </p>
                        }
                      >
                        {text}
                      </Panel>
                    ))}
                  </Collapse>
                </Col>

                <Col xs={24} md={16} lg={12}>
                  <CollapseStyled
                    className="styled-collapse"
                    accordion
                    bordered={false}
                    expandIconPosition="right"
                    expandIcon={() => <PlusIcon />}
                  >
                    {[11, 12, 13, 14, 15, 16].map(num => (
                      <Panel
                        key={num}
                        header={
                          <p style={{ marginBottom: 0, fontWeight: 700 }}>
                            A proin dolor at turpis arcu. Lectus interdum purus.
                          </p>
                        }
                      >
                        {text}
                      </Panel>
                    ))}
                  </CollapseStyled>
                </Col>

                <Divider />

                <Col
                  xs={24}
                  md={24}
                  lg={12}
                  style={{
                    paddingRight: "1.5rem",
                    paddingLeft: "1.5rem",
                    marginTop: "3rem",
                  }}
                >
                  <div>
                    <div>
                      <Heading
                        className="message-header text-center font-weight-700"
                        as="h3"
                      >
                        Send Us A Message
                      </Heading>
                    </div>

                    <Form
                      form={form}
                      onFinish={handleSubmit}
                      className="uploads"
                      layout="vertical"
                    >
                      <Form.Item name="firstname">
                        <InputStyled placeholder="First Name" />
                      </Form.Item>

                      <Form.Item name="lastname">
                        <InputStyled placeholder="Last Name" />
                      </Form.Item>

                      <Form.Item name="message">
                        <InputStyled.TextArea
                          placeholder="Message"
                          style={{ height: "165px" }}
                        />
                      </Form.Item>

                      <Form.Item>
                        <ButtonStyled
                          className=""
                          htmlType="submit"
                          type="primary"
                          size="large"
                        >
                          Send
                        </ButtonStyled>
                      </Form.Item>
                    </Form>
                  </div>
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

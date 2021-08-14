import React, { FC, useState } from "react";
import { Row, Collapse, Form, Col, Divider, Button, Spin } from "antd";
import { Cards } from "../../../../components/cards/frame/cards-frame";
import Heading from "../../../../components/heading/heading";
import { PageHeader } from "../../../../components/page-headers/page-headers";
import { Main } from "../../../AuthLayout/styled";
import { AdminSectionWrapper } from "../../styled";
import { ReactComponent as PlusIcon } from "../../../../static/svg/plus.svg";
import { ButtonStyled, InputStyled } from "../../../Styles";
import AddFaqModal from "./_partials/AddFaqModal";

// Styling
import "./help.less";
import { useAuthContext, useFAQContext } from "../../../../context";
import EditFAQModal from "./_partials/EditFAQModal";

const { Panel } = Collapse;

const tableHeader = (
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    <span>FAQs</span>
  </div>
);

// const text = (
//   <p>
//     Nam varius risus, donec sed imperdiet cursus sollicitudin leo. Magna mi
//     viverra sit diam posuere porttitor aliquet venenatis elementum. Quis lorem
//     nisl vitae nullam eros. Maecenas dui neque ut ultrices consectetur sed orci.
//     Quis.
//   </p>
// );

// var testData = [1, 2, 3, 4, 5, 6, 11, 12, 13, 14, 15, 16];

const Help: FC = props => {
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [isEditFAQModalOpen, setIsEditFAQModalOpen] = useState(false);
  const [currentFAQ, setCurrentFAQ] = useState(null);

  const {
    auth: { user },
  } = useAuthContext();
  const { isLoading, data } = useFAQContext();
  const [form] = Form.useForm();

  const handleSubmit = () => {};

  const toggleAddFaqModal = () => setIsFaqModalOpen(open => !open);
  const toggleEditFaqModal = () => setIsEditFAQModalOpen(open => !open);

  return (
    <AdminSectionWrapper className="help-section">
      <div>
        <PageHeader
          title={
            <Heading as="h3" style={{ fontSize: "24px", fontWeight: "bold" }}>
              Enterprise Data Map Guide
            </Heading>
          }
          buttons={
            user.is_admin
              ? [
                  <div key="1" className="page-header-actions">
                    <Button
                      className="add-faq-btn"
                      size="large"
                      type="primary"
                      onClick={toggleAddFaqModal}
                    >
                      Add FAQ
                    </Button>
                  </div>,
                ]
              : null
          }
          style={{ marginBottom: "0" }}
        />
      </div>

      <Main>
        <Row gutter={24}>
          <Col xs={24}>
            <Cards title={tableHeader}>
              {isLoading ? (
                <Row
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: "200px",
                  }}
                >
                  <Spin />
                </Row>
              ) : (
                <Row gutter={32}>
                  {data.map((d, key) => (
                    <Col key={key} xs={24} md={16} lg={11}>
                      <Collapse
                        className="styled-collapse"
                        accordion
                        bordered={false}
                        // defaultActiveKey={[key + 1]}
                        expandIconPosition="right"
                        expandIcon={() => <PlusIcon />}
                      >
                        <Panel
                          key={key + 1}
                          header={
                            <p style={{ marginBottom: 0, fontWeight: 700 }}>
                              {d.question}
                            </p>
                          }
                        >
                          {d.answer}

                          {user.is_admin && (
                            <div className="edit-content-btn">
                              <Button
                                onClick={() => {
                                  setCurrentFAQ(d);
                                  toggleEditFaqModal();
                                }}
                              >
                                Edit
                              </Button>
                            </div>
                          )}
                        </Panel>
                      </Collapse>
                    </Col>
                  ))}

                  <Divider />

                  <Col
                    xs={24}
                    md={24}
                    lg={24}
                    style={{
                      paddingRight: "1.5rem",
                      paddingLeft: "1.5rem",
                      marginTop: "3rem",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        maxWidth: "500px",
                        width: "100%",
                        margin: "0 auto",
                        textAlign: "center",
                      }}
                    >
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
              )}
            </Cards>
          </Col>
        </Row>

        {isFaqModalOpen ? (
          <AddFaqModal
            visible={isFaqModalOpen}
            closeModal={toggleAddFaqModal}
          />
        ) : null}

        {isEditFAQModalOpen ? (
          <EditFAQModal
            visible={isEditFAQModalOpen}
            closeModal={toggleEditFaqModal}
            currentFAQ={currentFAQ}
          />
        ) : null}
      </Main>
    </AdminSectionWrapper>
  );
};

export default Help;

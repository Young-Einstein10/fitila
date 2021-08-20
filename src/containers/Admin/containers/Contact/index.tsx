import { Col, Form, Row } from "antd";
import React from "react";
import Heading from "../../../../components/heading/heading";
import { Main } from "../../../AuthLayout/styled";
import { ButtonStyled, InputStyled } from "../../../Styles";
import { AdminSectionWrapper } from "../../styled";

const Contact = () => {
  const [form] = Form.useForm();

  const handleSubmit = () => {};

  return (
    <AdminSectionWrapper className="contact-us" background="#fff">
      <Main background="#fff">
        <Row style={{ justifyContent: "center", padding: "5rem 0" }}>
          <Col xs={24} md={12} lg={10}>
            <div>
              <Heading
                className="text-center font-weight-700"
                as="h3"
                fontSize="36px"
                fontWeight="bold"
                margin="0 0 2.5rem 0"
              >
                Send Us A Message
              </Heading>

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
                    // onClick={() => history.push("/business/preview")}
                  >
                    Send
                  </ButtonStyled>
                </Form.Item>
                {/* 
                <SpanFooter>
                  Please note, each upload cannot be larger than 20 MB, Document
                  type allowed: PDF, Docx and Xcel
                </SpanFooter> */}
              </Form>
            </div>
          </Col>
        </Row>
      </Main>
    </AdminSectionWrapper>
  );
};

export default Contact;

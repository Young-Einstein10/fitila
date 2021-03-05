import { Col, Row } from "antd";
import React from "react";
import Heading from "../../../../components/heading/heading";
import { PageHeader } from "../../../../components/page-headers/page-headers";
import { Main } from "../../../AuthLayout/styled";
import { AdminSectionWrapper } from "../../styled";

const About = () => {
  return (
    <AdminSectionWrapper>
      <div>
        <PageHeader
          title={
            <Heading as="h2" style={{ fontSize: "30px", fontWeight: "bold" }}>
              Project Brief
            </Heading>
          }
          style={{ marginBottom: "0" }}
        />
      </div>

      <Main>
        <Row gutter={16}>
          <Col span={12}>
            <p>
              Enterprise Data Map by FATE Foundation is Nigeria’s foremost
              online centralized, keyword-searchable, index data source
              providing an overview of entrepreneurship ecosystem players in
              Nigeria according to key entrepreneurship segments: policy &
              regulation, business support, funding, training, market access,
              resources; research & development, MSMEs, Startups etc. The goal
              with this platform is to bridge the data gap within the Nigerian
              entrepreneurship ecosystem and support entrepreneurship policy and
              program design, review and implementation while also driving
              collaboration within the space...
            </p>
          </Col>
        </Row>
      </Main>
    </AdminSectionWrapper>
  );
};

export default About;

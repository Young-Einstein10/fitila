import { Button, Col, Row } from "antd";
import React from "react";
import { PageHeader } from "../../../../components/page-headers/page-headers";
import { Main } from "../../../AuthLayout/styled";
import { AdminSectionWrapper } from "../../styled";

const Help = () => {
  return (
    <AdminSectionWrapper>
      <div>
        <PageHeader
          title="Gain credible insights into Nigeria’s most thriving Organizations"
          buttons={[
            <div key="1" className="page-header-actions">
              <Button size="large" type="primary">
                List Your Business
              </Button>
            </div>,
          ]}
        />
      </div>

      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <p>Help</p>
          </Col>
        </Row>
      </Main>
    </AdminSectionWrapper>
  );
};

export default Help;

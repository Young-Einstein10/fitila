import React from "react";
import { Button, Row, Col, Table } from "antd";
import { PageHeader } from "../../../../components/page-headers/page-headers";
import { Main } from "../../../AuthLayout/styled";
import { AdminSectionWrapper } from "../../styled";

const AdministratorScreen = () => {
  return (
    <AdminSectionWrapper className="administrators">
      <PageHeader
        title="Administrators"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button size="large" type="primary">
              Add Administrators
            </Button>
          </div>,
        ]}
        style={{
          background: "none",
        }}
      />

      <Main>
        <Row>
          <Col>
            <Table
              className="table-responsive"
              dataSource={[]}
              columns={[]}
              loading={false}
            />
          </Col>
        </Row>
      </Main>
    </AdminSectionWrapper>
  );
};

export default AdministratorScreen;

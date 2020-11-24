import React from "react";
import { Row, Col, Card } from "antd";
import { ReactComponent as Icon1 } from "../../../../../../static/svg/icon1.svg";

const SummaryData = ({ business }) => {
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col span={6}>
        <Card>
          <p style={{ color: "#81868C", borderRadius: "4px" }}>
            Number of Organizations
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                marginBottom: "0px",
              }}
            >
              {business.organization.length}
            </p>
            <Icon1 />
          </div>
        </Card>
      </Col>

      <Col span={6}>
        <Card>
          <p style={{ color: "#81868C", borderRadius: "4px" }}>
            Number of States
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                marginBottom: "0px",
              }}
            >
              5
            </p>
            <Icon1 />
          </div>
        </Card>
      </Col>

      <Col span={6}>
        <Card>
          <p style={{ color: "#81868C", borderRadius: "4px" }}>Locations</p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                marginBottom: "0px",
              }}
            >
              376
            </p>
            <Icon1 />
          </div>
        </Card>
      </Col>

      <Col span={6}>
        <Card>
          <p style={{ color: "#81868C", borderRadius: "4px" }}>
            Estimated Market Size
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                marginBottom: "0px",
              }}
            >
              ₦9.5B
            </p>
            <Icon1 />
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default SummaryData;

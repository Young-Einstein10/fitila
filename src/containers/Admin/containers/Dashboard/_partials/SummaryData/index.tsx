import React from "react";
import { Row, Col, Card } from "antd";
import { ReactComponent as Icon1 } from "../../../../../../static/svg/icon1.svg";
import { ReactComponent as StarIcon } from "../../../../../../static/svg/star.svg";
import { ReactComponent as LocationIcon } from "../../../../../../static/svg/location.svg";
import { ReactComponent as HandBagIcon } from "../../../../../../static/svg/handbag.svg";

const SummaryData = ({ business }) => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={8} lg={6}>
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

      <Col xs={24} sm={12} md={8} lg={6}>
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
            <StarIcon />
          </div>
        </Card>
      </Col>

      <Col xs={24} sm={12} md={8} lg={6}>
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
            <LocationIcon />
          </div>
        </Card>
      </Col>

      <Col xs={24} sm={12} md={8} lg={6}>
        <Card>
          <p style={{ color: "#81868C", borderRadius: "4px" }}>
            Number of Sectors
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
              7
            </p>
            <HandBagIcon />
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default SummaryData;

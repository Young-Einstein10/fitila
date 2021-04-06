import React from "react";
import { Row, Col, Card } from "antd";
import { ReactComponent as Icon1 } from "../../../../../../static/svg/icon1.svg";
import { ReactComponent as StarIcon } from "../../../../../../static/svg/star.svg";
import { ReactComponent as LocationIcon } from "../../../../../../static/svg/location.svg";
import { ReactComponent as HandBagIcon } from "../../../../../../static/svg/handbag.svg";
import Styled from "styled-components";
import {
  useOrganizationContext,
  useSectorContext,
} from "../../../../../../context";

const CardStyled = Styled(Card)`
  box-shadow: 0px 2px 8px rgba(53, 55, 81, 0.04);
  border-radius: 4px;
`;

const SummaryData = () => {
  const { states, data: organizations } = useOrganizationContext();
  const { data: sectors } = useSectorContext();

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={8} lg={8}>
        <CardStyled>
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
              {organizations.length}
            </p>
            <Icon1 />
          </div>
        </CardStyled>
      </Col>

      <Col xs={24} sm={12} md={8} lg={8}>
        <CardStyled>
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
              {states.length}
            </p>
            <StarIcon />
          </div>
        </CardStyled>
      </Col>

      <Col xs={24} sm={12} md={8} lg={8}>
        <CardStyled>
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
              {sectors.length}
            </p>
            <HandBagIcon />
          </div>
        </CardStyled>
      </Col>
    </Row>
  );
};

export default SummaryData;

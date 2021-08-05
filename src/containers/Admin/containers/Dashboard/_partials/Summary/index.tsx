import React from "react";
import { Row, Col, Card } from "antd";
import Styled from "styled-components";
import {
  useOrganizationContext,
  useSectorContext,
} from "../../../../../../context";
import {
  Icon1,
  StarIcon,
  HandbagIcon,
} from "../../../../../../components/svgs";
import numberWithCommas from "../../../../../../utils/numberFormatter";

const CardStyled = Styled(Card)`
  box-shadow: 0px 2px 8px rgba(53, 55, 81, 0.04);
  border-radius: 4px;
`;

const Summary = () => {
  const { states, data: organizations } = useOrganizationContext();
  const { data: sectors } = useSectorContext();

  const numOfStartUps = organizations.filter(org => org.is_startup === true)
    .length;

  const numOfFemaleFounders = organizations.filter(
    org => org.ceo_gender.toLowerCase() === "female"
  ).length;

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
            <HandbagIcon />
          </div>
        </CardStyled>
      </Col>

      <Col xs={24} sm={12} md={8} lg={8}>
        <CardStyled>
          <p style={{ color: "#81868C", borderRadius: "4px" }}>
            Number of Startups
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
              {numOfStartUps}
            </p>
            <HandbagIcon />
          </div>
        </CardStyled>
      </Col>

      <Col xs={24} sm={12} md={8} lg={8}>
        <CardStyled>
          <p style={{ color: "#81868C", borderRadius: "4px" }}>
            Number of Female Founders
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
              {numOfFemaleFounders}
            </p>
            <HandbagIcon />
          </div>
        </CardStyled>
      </Col>

      <Col xs={24} sm={12} md={8} lg={8}>
        <CardStyled>
          <p style={{ color: "#81868C", borderRadius: "4px" }}>
            Funding disbursed by Support Organizations
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
              ${numberWithCommas(500000)}
            </p>
            <HandbagIcon />
          </div>
        </CardStyled>
      </Col>

      {/* <Col xs={24} sm={12} md={8} lg={8}>
        <CardStyled>
          <p style={{ color: "#81868C", borderRadius: "4px" }}>
            Funding Raised by Startups
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
              $100000
            </p>
            <HandBagIcon />
          </div>
        </CardStyled>
      </Col>

      <Col xs={24} sm={12} md={8} lg={8}>
        <CardStyled>
          <p style={{ color: "#81868C", borderRadius: "4px" }}>
            Funding raised by MSMEs
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
              $100000
            </p>
            <HandBagIcon />
          </div>
        </CardStyled>
      </Col>

      
      */}
    </Row>
  );
};

export default Summary;

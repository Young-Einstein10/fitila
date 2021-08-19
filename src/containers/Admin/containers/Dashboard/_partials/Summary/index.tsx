import React from "react";
import { Row, Col, Card } from "antd";
import styled from "styled-components";
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

const CardStyled = styled(Card)`
  /* box-shadow: 0px 2px 8px rgba(53, 55, 81, 0.04); */
  border-radius: 4px;

  .title {
    color: #81868c;
    border-radius: 4px;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      font-size: 48px;
      font-weight: bold;
      margin-bottom: 0;
    }
  }
`;

const Summary = () => {
  const { states, data: organizations } = useOrganizationContext();
  const { data: sectors } = useSectorContext();

  const numOfStartUps = organizations.filter(org => org.is_startup === true)
    .length;

  const numOfFemaleFounders = organizations.filter(
    org => org.ceo_gender.toLowerCase() === "female"
  ).length;

  const totalFundingDisbursedForSupport = organizations.reduce(
    (total, { funding_disbursed_for_support }) =>
      total +
      Number(funding_disbursed_for_support ? funding_disbursed_for_support : 0),
    0
  );

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={8} lg={8}>
        <CardStyled>
          <p className="title">Number of Organizations</p>

          <div className="content">
            <p>{organizations.length}</p>
            <Icon1 />
          </div>
        </CardStyled>
      </Col>

      <Col xs={24} sm={12} md={8} lg={8}>
        <CardStyled>
          <p className="title">Number of States</p>

          <div className="content">
            <p>{states.length}</p>
            <StarIcon />
          </div>
        </CardStyled>
      </Col>

      <Col xs={24} sm={12} md={8} lg={8}>
        <CardStyled>
          <p className="title">Number of Sectors</p>

          <div className="content">
            <p>{sectors.length}</p>
            <HandbagIcon />
          </div>
        </CardStyled>
      </Col>

      <Col xs={24} sm={12} md={8} lg={8}>
        <CardStyled>
          <p className="title">Number of Startups</p>

          <div className="content">
            <p>{numOfStartUps}</p>
            <HandbagIcon />
          </div>
        </CardStyled>
      </Col>

      <Col xs={24} sm={12} md={8} lg={8}>
        <CardStyled>
          <p className="title">Number of Female Founders</p>

          <div className="content">
            <p>{numOfFemaleFounders}</p>
            <HandbagIcon />
          </div>
        </CardStyled>
      </Col>

      <Col xs={24} sm={12} md={8} lg={8}>
        <CardStyled>
          <p className="title">Funding disbursed for Support Organizations</p>

          <div className="content">
            <p>₦{numberWithCommas(totalFundingDisbursedForSupport) || 0}</p>
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

import React, { FC } from "react";
import { Row, Col, Card } from "antd";
import Styled from "styled-components";
import { IEcosystemProps } from "../../../../../../context/Ecosystem/types";
import { Icon1, StarIcon, SectorIcon } from "../../../../../../components/svgs";

const CardStyled = Styled(Card)`
  box-shadow: 0px 2px 8px rgba(53, 55, 81, 0.04);
  border-radius: 4px;
  flex-direction: column;

  .title {
    color: #81868C;
    border-radius: 4px;
    text-transform: capitalize;
  }

  .description {
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

const SummaryData: FC<{ currEcosystem: IEcosystemProps }> = ({
  currEcosystem,
}) => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={8} lg={8}>
        <CardStyled>
          <p className="title">Number of Organizations</p>

          <div className="description">
            <p>{currEcosystem.num_of_organization || 0}</p>
            <Icon1 />
          </div>
        </CardStyled>
      </Col>

      <Col xs={24} sm={12} md={8} lg={8}>
        <CardStyled>
          <p className="title">Number of States</p>

          <div className="description">
            <p>{currEcosystem.num_of_states || 0}</p>
            <StarIcon />
          </div>
        </CardStyled>
      </Col>

      <Col xs={24} sm={12} md={8} lg={8}>
        <CardStyled>
          <p className="title">Number of Sectors</p>

          <div className="description">
            <p>{currEcosystem.num_of_sectors || 0}</p>
            <SectorIcon width="34" height="34" fill="#0D79DF" />
          </div>
        </CardStyled>
      </Col>
    </Row>
  );
};

export default SummaryData;

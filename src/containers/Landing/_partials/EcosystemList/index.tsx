import React, { FC } from "react";
import { Row, Col, Button } from "antd";
import { NavLink } from "react-router-dom";
import { useEcosystemContext } from "../../../../context";
import { ReactComponent as Search } from "../../../../static/svg/search.svg";
import styled from "styled-components";

const EcosystemStyled = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 3.75rem;
  padding-bottom: 9rem;

  .title {
    font-size: 1rem;
    color: #1d429c;
  }

  .ant-row {
    max-width: 800px;
    margin: 0 auto;
    justify-content: center;
  }

  svg {
    margin-left: 0.625rem;
  }
`;

const ButtonStyled = styled(Button)`
  font-size: 0.875rem;
  font-weight: bold;
  color: ${({ theme }) => theme["text-primary"]};
  background: ${({ theme }) => theme["secondary-hover"]};
  margin-left: 0.9375rem;
  margin-top: 0.625rem;
  box-shadow: none;
  text-shadow: none;
  border: 0;

  &:hover {
    background: ${({ theme }) => theme["secondary-hover"]};
    color: ${({ theme }) => theme["text-primary"]};
  }
`;

const EcosystemList: FC = () => {
  const {
    isLoading: isEcosystemLoading,
    data: ecosystems,
  } = useEcosystemContext();

  return (
    <EcosystemStyled>
      <p className="title">Explore ecosystem players by segment</p>

      <Row>
        {isEcosystemLoading ? (
          <p>Loading...</p>
        ) : (
          ecosystems.map(segment => (
            <Col key={segment.id} className="text-center">
              <NavLink
                to={`/d/segments/${segment.name
                  .split(" ")
                  .join("_")
                  .toLowerCase()}`}
              >
                <ButtonStyled>
                  {segment.name}
                  <Search />
                </ButtonStyled>
              </NavLink>
            </Col>
          ))
        )}
      </Row>
    </EcosystemStyled>
  );
};

export default EcosystemList;

import React, { FC } from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import { Cards } from "../../../../../../components/cards/frame/cards-frame";
import { useAuthContext, useEcosystemContext } from "../../../../../../context";
import { generateIcons } from "../../functions";
import { CardSegmentStyled } from "../../styled";
import { ReactComponent as AddIcon } from "../../../../../../static/svg/add.svg";

const EcosystemList: FC = () => {
  const {
    isLoading: isEcosystemLoading,
    data: ecosystems,
  } = useEcosystemContext();

  const {
    auth: { user },
  } = useAuthContext();

  return (
    <Row gutter={25} style={{ marginTop: "2rem" }}>
      <Col xs={24}>
        <Cards
          loading={isEcosystemLoading}
          title="Explore by Ecosystem Segments"
          size="large"
        >
          {
            <Row gutter={[16, 16]}>
              {ecosystems.map(segment => (
                <Col
                  className="gutter-row"
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  key={segment.id}
                  style={{ minHeight: "122px" }}
                >
                  <Link
                    to={`/d/segments/${segment.name
                      .split(" ")
                      .join("_")
                      .toLowerCase()}`}
                  >
                    <CardSegmentStyled>
                      {generateIcons(segment.name.toLowerCase())}

                      <div>
                        <strong>{segment.name}</strong>
                        <br />
                        <span>
                          {segment.sub_ecosystem.length} Sub-Ecosystem
                        </span>
                      </div>
                    </CardSegmentStyled>
                  </Link>
                </Col>
              ))}
              {user?.is_admin && (
                <Col
                  className="gutter-row"
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  style={{ minHeight: "122px" }}
                >
                  <Link to={`/d/ecosystem`}>
                    <CardSegmentStyled>
                      <span className="plus-wrapper">
                        <AddIcon />
                      </span>
                    </CardSegmentStyled>
                  </Link>
                </Col>
              )}
            </Row>
          }
        </Cards>
      </Col>
    </Row>
  );
};

export default EcosystemList;

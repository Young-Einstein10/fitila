import React, { useState, FC } from "react";
import { Button, Form, Row, Select, Col } from "antd";
import Heading from "../../components/heading/heading";
import { ReactComponent as Search } from "../../static/svg/search.svg";
import { ReactComponent as SearchIconLeft } from "../../static/svg/SearchIconLeft.svg";
import { ReactComponent as SearchIconRight } from "../../static/svg/SearchIconRight.svg";

import { SectionWrapper, SelectStyled } from "../Styles";
import { NavLink, RouteComponentProps } from "react-router-dom";
import Styled from "styled-components";
import { useEcosystemContext, useOrganizationContext } from "../../context";
import "./styles.less";

const ButtonStyled = Styled(Button)`
  font-size: 0.875rem;
  font-weight: bold;
  color: ${({ theme }) => theme["secondary-color"]};
  background: ${({ theme }) => theme["secondary-hover"]};
  margin-left: 0.9375rem;
  margin-top: 0.625rem;
  box-shadow: none;
  text-shadow: none;
  border: 0;

  &:hover {
    background: ${({ theme }) => theme["secondary-hover"]};
    color: ${({ theme }) => theme["secondary-color"]};
  }
`;

const { Option } = Select;

const Landing: FC<RouteComponentProps> = ({ history }) => {
  const [dropDownIsOpen, setDropdownIsOpen] = useState(false);

  const {
    isLoading: isOrganizationLoading,
    data: organizations,
  } = useOrganizationContext();

  const {
    isLoading: isEcosystemLoading,
    data: ecosystems,
  } = useEcosystemContext();

  return (
    <SectionWrapper className="section-landing">
      <Form
        className="landing"
        name="login"
        // onFinish={handleSubmit}
        layout="vertical"
        style={{ paddingTop: "8rem" }}
      >
        <Heading
          style={{ fontSize: "3rem", fontWeight: "bold", marginTop: "5rem" }}
          className="text-center"
          as="h1"
        >
          Access Over 6000+ Data Points
        </Heading>

        <p
          style={{ fontSize: "1.5rem", color: "#696969" }}
          className="text-center"
        >
          Gain credible insights into Nigeria's entrepreneurship ecosystem
        </p>

        <Form.Item
          name="search__box"
          style={{
            marginTop: "2.5rem",
            display: "flex",
            justifyContent: "center",
            padding: "0 2rem",
          }}
        >
          <SelectStyled
            width="898px"
            autoFocus
            showSearch
            suffixIcon={
              dropDownIsOpen ? <SearchIconRight /> : <SearchIconLeft />
            }
            placeholder="Search by Organization, Sector and States"
            optionFilterProp="children"
            onChange={() => {}}
            onBlur={() => {}}
            onDropdownVisibleChange={open => {
              setDropdownIsOpen(open);
            }}
            onSelect={val => {
              let selectedOrg = organizations.find(org => org.name === val);
              console.log(selectedOrg);
              selectedOrg.id && history.push(`/d/profile/${selectedOrg.id}`);
            }}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            loading={isOrganizationLoading}
          >
            {organizations.map((org, key) => (
              <Option key={key} value={org.name}>
                {org.name}
              </Option>
            ))}
          </SelectStyled>
        </Form.Item>
      </Form>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "3.75rem",
          paddingBottom: "6rem",
        }}
      >
        <p style={{ fontSize: "1rem", color: "#1D429C" }}>
          Explore ecosystem players by segment
        </p>

        <Row
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            justifyContent: "center",
          }}
        >
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
                    <Search style={{ marginLeft: "0.625rem" }} />
                  </ButtonStyled>
                </NavLink>
              </Col>
            ))
          )}
        </Row>
      </div>
    </SectionWrapper>
  );
};

export default Landing;

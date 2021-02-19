import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Col, Form, Row, Select } from "antd";
import Heading from "../../components/heading/heading";
import { ReactComponent as Search } from "../../static/svg/search.svg";
import { ReactComponent as SearchIconLeft } from "../../static/svg/SearchIconLeft.svg";
import { ReactComponent as SearchIconRight } from "../../static/svg/SearchIconRight.svg";

import { SectionWrapper, SelectStyled } from "../Styles";
import {
  getEcosystem,
  getOrganization,
} from "../../redux/actions/businessActions";
import "./styles.less";
import { NavLink } from "react-router-dom";
import Styled from "styled-components";

const ButtonStyled = Styled(Button)`
  font-size: 0.875rem;
  font-weight: bold;
  color: #BF1E2E;
  background:#FFECDD;
  margin-left: 0.9375rem;
  margin-top: 0.625rem;
  box-shadow: none;
  text-shadow: none;
  border: 0;

  &:hover {
    background: #FFECDD;
    color: #BF1E2E;
  }
`;

const { Option } = Select;

const Landing = ({
  history,
  auth,
  business: { segments, organization },
  getEcosystem,
  getOrganization,
}) => {
  const [dropDownIsOpen, setDropdownIsOpen] = useState(false);

  useEffect(() => {
    // getEcosystem();

    // getOrganization();
  }, [auth, getEcosystem, getOrganization]);

  const handleSubmit = () => {};

  const links = [
    { name: "Business Support", url: "/d/segments/businessSupport" },
    { name: "Training", url: "/d/segments/training" },
    { name: "Funding", url: "/d/segments/funding" },
    { name: "Market Access", url: "/d/segments/marketAccess" },
    { name: "Research", url: "/d/segments/research" },
    { name: "Policy Regulation", url: "/d/segments/policyRegulation" },
    { name: "Resources", url: "/d/segments/resources" },
    { name: "Businesses", url: "/d/segments/businesses" },
  ];

  return (
    <SectionWrapper className="section-landing">
      <Form
        className="landing"
        name="login"
        onFinish={handleSubmit}
        layout="vertical"
        style={{ paddingTop: "8rem" }}
      >
        <Heading
          style={{ fontSize: "3rem", fontWeight: "bold" }}
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
              let selectedOrg = organization.find(org => org.name === val);
              console.log(selectedOrg);
              selectedOrg.id && history.push(`/d/profile/${selectedOrg.id}`);
            }}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {organization.map((org, key) => (
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
          {segments.map((segment, key) => (
            <Col key={key} className="text-center">
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
          ))}
        </Row>
      </div>
    </SectionWrapper>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  business: state.business,
});

export default connect(mapStateToProps, { getEcosystem, getOrganization })(
  Landing
);

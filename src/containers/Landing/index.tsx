import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Button, Col, Form, Row, Select } from "antd";
import Heading from "../../components/heading/heading";
import { ReactComponent as Search } from "../../static/svg/search.svg";
import { ReactComponent as SelectSearchIcon } from "../../static/svg/selectSearchIcon.svg";
import { SectionWrapper } from "../Styles";
import {
  getEcosystem,
  getOrganization,
} from "../../redux/actions/businessActions";
import "./styles.less";
import { NavLink } from "react-router-dom";
import Styled from "styled-components";

const ButtonStyled = Styled(Button)`
  font-size: 14px;
  font-weight: bold;
  color: #BF1E2E;
  background:#FFECDD;
  margin-left: 15px;
  margin-top: 20px;
  box-shadow: none;
  text-shadow: none;
  border: 0;

  &:hover {
    background: #FFECDD;
    color: #BF1E2E;
  }
`;

const SelectStyled = Styled(Select)`
  width: 898px !important;

  & span.ant-select-arrow {
    top: 43%;
    width: 21px;
    height: 21px;
  }
`;

const { Option } = Select;

const Landing = ({
  auth,
  business: { segments, organization },
  getEcosystem,
  getOrganization,
}) => {
  // useEffect(() => {
  //   if (auth.isAuthenticated) {
  //     getEcosystem();

  //     getOrganization();
  //   }
  // }, [auth, getEcosystem, getOrganization]);

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
        style={{ paddingTop: "6rem" }}
      >
        <Heading
          style={{ fontSize: "48px", fontWeight: "bold" }}
          className="text-center"
          as="h1"
        >
          Access Over 6000+ Data Points
        </Heading>

        <p
          style={{ fontSize: "24px", color: "#696969" }}
          className="text-center"
        >
          Gain credible insights into Nigeria's entrepreneurship ecosystem
        </p>

        <Form.Item
          name="search__box"
          style={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* <Input.Search
            size="large"
            placeholder="Search by Organization, Sector and States"
            style={{ width: "80%" }}
          /> */}

          <SelectStyled
            suffixIcon={<SelectSearchIcon />}
            showSearch
            placeholder="Search by Organization, Sector and States"
            optionFilterProp="children"
            onChange={() => {}}
            onFocus={() => {}}
            onBlur={() => {}}
            onSearch={val => {
              console.log(val);
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
          marginTop: "60px",
          paddingBottom: "6rem",
        }}
      >
        <p style={{ fontSize: "16px", color: "#1D429C" }}>
          Explore ecosystem players by segment
        </p>

        <Row
          style={{
            maxWidth: "800px",
            margin: "0px auto",
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
                  <Search style={{ marginLeft: "10px" }} />
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

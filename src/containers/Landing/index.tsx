import React, { useState, FC } from "react";
import { Form, Select } from "antd";
import Heading from "../../components/heading/heading";
import { ReactComponent as SearchIconLeft } from "../../static/svg/SearchIconLeft.svg";
import { ReactComponent as SearchIconRight } from "../../static/svg/SearchIconRight.svg";
import { SectionWrapper, SelectStyled } from "../Styles";
import { RouteComponentProps } from "react-router-dom";
import { useOrganizationContext } from "../../context";
import EcosystemList from "./_partials/EcosystemList";
import { FormStyled } from "./styled";

const { Option } = Select;

const Landing: FC<RouteComponentProps> = ({ history }) => {
  const [dropDownIsOpen, setDropdownIsOpen] = useState(false);

  const {
    isLoading: isOrganizationLoading,
    data: organizations,
  } = useOrganizationContext();

  return (
    <SectionWrapper className="section-landing">
      <FormStyled className="landing" name="searchWrapper" layout="vertical">
        <Heading
          className="header-main text-center"
          as="h1"
          children="Access Over 6000+ Data Points"
        />

        <p className="extra-text">
          Gain credible insights into Nigeria's entrepreneurship ecosystem
        </p>

        <Form.Item className="search__box" name="search__box">
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
              // let value = val.toString().toLowerCase();

              // const filteredData = organizations.find(record => {
              //   console.log({ record });

              //   return Object.keys(record).some(
              //     key =>
              //       record &&
              //       record[key]
              //         .toString()
              //         .toLowerCase()
              //         .includes(value)
              //   );
              // });

              // console.log(filteredData);

              let selectedOrg = organizations.find(org => org.name === val);
              selectedOrg.id && history.push(`/d/profile/${selectedOrg.id}`);
            }}
            filterOption={(input, option) => {
              return (
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              );
            }}
            loading={isOrganizationLoading}
          >
            {organizations.map((org, key) => (
              <Option key={key} value={org.name}>
                {org.name}
              </Option>
            ))}
          </SelectStyled>
        </Form.Item>
      </FormStyled>

      <EcosystemList />
    </SectionWrapper>
  );
};

export default Landing;

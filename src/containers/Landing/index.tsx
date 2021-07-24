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
    states,
    sectors,
  } = useOrganizationContext();

  const handleSearch = (val: string) => {
    let result = JSON.parse(val);

    const { type, value } = result;

    // console.log(result);
    const filteredData = organizations.find(record => {
      if (type === "organization") {
        return Object.keys(record).some(
          key =>
            record &&
            record[key] &&
            record[key]
              .toString()
              .toLowerCase()
              .includes(value.name.toLowerCase())
        );
      } else {
        return Object.keys(record).some(
          key =>
            record &&
            record[key] &&
            record[key]
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase())
        );
      }
    });

    // console.log(filteredData);

    type === "sector"
      ? history.push(`/d/organizations`, {
          sector: value.toLowerCase(),
        })
      : type === "state"
      ? history.push(`/d/organizations/${value.toLowerCase()}`)
      : filteredData.id && history.push(`/d/profile/${filteredData.id}`);
  };

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
            onSelect={handleSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            loading={isOrganizationLoading}
          >
            {organizations.map((org, key) => (
              <Option
                key={key}
                value={JSON.stringify({ type: "organization", value: org })}
              >
                {org.name}
              </Option>
            ))}

            {sectors.map((sector, key) => (
              <Option
                key={key + sector}
                value={JSON.stringify({ type: "sector", value: sector })}
              >
                {sector}
              </Option>
            ))}

            {states.map((state, key) => (
              <Option
                key={key + state}
                value={JSON.stringify({ type: "state", value: state })}
              >
                {state}
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

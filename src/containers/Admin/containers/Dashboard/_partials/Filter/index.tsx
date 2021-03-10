import React from "react";
import { Row, Col, Select } from "antd";
import { ReactComponent as FilterOutlined } from "../../../../../../static/svg/filter.svg";
import { ReactComponent as ArrowDown } from "../../../../../../static/svg/arrowDown.svg";
import { SelectStyled } from "../../../../../Styles";
import { useOrganizationContext } from "../../../../../../context";

const { Option } = Select;

const FilterOption = () => {
  const { data: organizations, states, sectors } = useOrganizationContext();

  return (
    <Row gutter={[16, 16]} style={{ padding: "0 1.3rem 1.3rem" }}>
      <Col xs={24} sm={24} md={12} lg={8}>
        <SelectStyled
          suffixIcon={<ArrowDown />}
          showSearch
          placeholder={
            <span>
              {" "}
              <FilterOutlined style={{ marginRight: "1.5rem" }} />
              Filter By Organization
            </span>
          }
          optionFilterProp="children"
          onChange={() => {}}
          onFocus={() => {}}
          onBlur={() => {}}
          onSelect={val => {
            console.log(val);
          }}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {organizations.map((org, key) => (
            <Option key={key} value={org.name}>
              {org.name}
            </Option>
          ))}
        </SelectStyled>
      </Col>

      <Col xs={24} sm={24} md={12} lg={8}>
        <SelectStyled
          suffixIcon={<ArrowDown />}
          showSearch
          placeholder={
            <span>
              <FilterOutlined style={{ marginRight: "1.5rem" }} />
              Filter By States
            </span>
          }
          optionFilterProp="children"
          onChange={() => {}}
          onFocus={() => {}}
          onBlur={() => {}}
          onSelect={val => {
            console.log(val);
          }}
          filterOption={(input, option) =>
            option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {states.map((state, key) => (
            <Option key={key} value={state}>
              {state}
            </Option>
          ))}
        </SelectStyled>
      </Col>

      <Col xs={24} sm={24} md={12} lg={8}>
        <SelectStyled
          suffixIcon={<ArrowDown />}
          showSearch
          placeholder={
            <span>
              <FilterOutlined style={{ marginRight: "1.5rem" }} />
              Filter By Sectors
            </span>
          }
          optionFilterProp="children"
          onChange={() => {}}
          onFocus={() => {}}
          onBlur={() => {}}
          onSelect={val => {
            console.log(val);
          }}
          filterOption={(input, option) =>
            option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {sectors.map((sector, key) => (
            <Option key={key} value={sector}>
              {sector}
            </Option>
          ))}
        </SelectStyled>
      </Col>
    </Row>
  );
};

export default FilterOption;

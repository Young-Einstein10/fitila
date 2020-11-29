import React from "react";
import { connect } from "react-redux";
import { Row, Col, Dropdown, Button, Menu, Select } from "antd";
import { ReactComponent as FilterOutlined } from "../../../../../../static/svg/filter.svg";
import { ReactComponent as ArrowDown } from "../../../../../../static/svg/arrowDown.svg";
import { SelectStyled } from "../../../../../Styles";

const { Option } = Select;

const FilterOption = ({ business }) => {
  const sectorData = (
    <Menu onClick={() => {}}>
      {business.sectors.map((sector, key) => (
        <Menu.Item key={key}>{sector}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Row gutter={[16, 16]} style={{ padding: "0 1.3rem 1.3rem" }}>
      <Col xs={24} sm={24} md={12} lg={8}>
        <SelectStyled
          suffixIcon={<ArrowDown />}
          showSearch
          placeholder={<span>Filter By Organization</span>}
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
          {business.organization.map((org, key) => (
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
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {business.states.map((state, key) => (
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
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {business.sectors.map((sector, key) => (
            <Option key={key} value={sector}>
              {sector}
            </Option>
          ))}
        </SelectStyled>
      </Col>
    </Row>
  );
};

const mapStateToProps = state => ({
  business: state.business,
});

export default connect(mapStateToProps)(FilterOption);

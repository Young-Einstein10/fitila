import React, { FC } from "react";
import { Row, Col } from "antd";
import { ReactComponent as ArrowDown } from "../../../../../static/svg/arrowDown.svg";
import { ReactComponent as FilterOutlined } from "../../../../../static/svg/filter.svg";
import { ReactComponent as SearchIconLeft } from "../../../../../static/svg/SearchIconLeft.svg";
import { SelectStyled } from "../../../../Styles";
import { IOrganizationProps } from "../../../../../context/Organization/types";

const { Option } = SelectStyled;

interface IOrganizationFilterProps {
  isOrganizationLoading: boolean;
  organizations: IOrganizationProps[];
  setFilteredOrganizations: React.Dispatch<
    React.SetStateAction<IOrganizationProps[]>
  >;
  states: string[];
  sectors: string[];
}

type IFilterOption = "name" | "state" | "sector";

const OrganizationFilter: FC<IOrganizationFilterProps> = ({
  isOrganizationLoading,
  organizations,
  setFilteredOrganizations,
  sectors,
  states,
}) => {
  const filterOrganizations = (
    filterValue: string,
    filterMethod: IFilterOption
  ) => {
    if (filterMethod === "name") {
      const result = organizations
        .map(organization => organization)
        .filter(organization => organization.name === filterValue);

      setFilteredOrganizations(result);
    }

    if (filterMethod === "state") {
    }
  };

  return (
    <section className="organization-filter">
      <div style={{ padding: "0 1.3rem" }}>
        <p>
          <strong>Filter</strong>
        </p>
      </div>
      <Row gutter={[16, 16]} style={{ padding: "0 1.3rem 1.3rem" }}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <SelectStyled
            loading={isOrganizationLoading}
            suffixIcon={<ArrowDown />}
            showSearch
            placeholder={
              <span>
                {" "}
                <SearchIconLeft style={{ marginRight: "1.5rem" }} />
                Filter By Organization
              </span>
            }
            optionFilterProp="children"
            onChange={() => {}}
            onFocus={() => {}}
            onBlur={() => {}}
            onSelect={(val: string) => {
              filterOrganizations(val, "name");
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

        <Col xs={24} sm={24} md={12} lg={6}>
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
            {states.map((state, key) => (
              <Option key={key} value={state}>
                {state}
              </Option>
            ))}
          </SelectStyled>
        </Col>

        <Col xs={24} sm={24} md={12} lg={6}>
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
            {sectors.map((sector, key) => (
              <Option key={key} value={sector}>
                {sector}
              </Option>
            ))}
          </SelectStyled>
        </Col>
      </Row>
    </section>
  );
};

export default OrganizationFilter;

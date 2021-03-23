import React, { FC, useEffect } from "react";
import { Row, Col, Input, Form } from "antd";
import { ReactComponent as ArrowDown } from "../../../../../static/svg/arrowDown.svg";
import { ReactComponent as FilterOutlined } from "../../../../../static/svg/filter.svg";
import { ReactComponent as SearchIconLeft } from "../../../../../static/svg/SearchIconLeft.svg";
import { SelectStyled } from "../../../../Styles";
import { IOrganizationProps } from "../../../../../context/Organization/types";
import { ISectorProps } from "../../../../../context/Sector/types";

const { Option } = SelectStyled;
const FormItem = Form.Item;

interface IOrganizationFilterProps {
  isOrganizationLoading: boolean;
  organizations: IOrganizationProps[];
  setFilteredOrganizations: React.Dispatch<
    React.SetStateAction<IOrganizationProps[]>
  >;
  states: string[];
  sectors: ISectorProps[];
  state: string;
}

type IFilterOption = "name" | "state" | "sector" | "search";

const OrganizationFilter: FC<IOrganizationFilterProps> = ({
  isOrganizationLoading,
  organizations,
  setFilteredOrganizations,
  state,
  sectors,
  states,
}) => {
  useEffect(() => {
    if (state) {
      const result = organizations
        .map(organization => organization)
        .filter(
          organization =>
            organization.state.toLowerCase() === state.toLowerCase()
        );

      setFilteredOrganizations(result);
    }
  }, [state, organizations, setFilteredOrganizations]);

  const filterOrganizations = (
    filterValue: string,
    filterMethod: IFilterOption
  ) => {
    if (filterValue === "") {
      return;
    } else {
      if (filterMethod === "sector") {
        const result = organizations
          .map(organization => organization)
          .filter(organization => organization.sector_name === filterValue);

        setFilteredOrganizations(result);
      }

      if (filterMethod === "state") {
        const result = organizations
          .map(organization => organization)
          .filter(organization => organization.state === filterValue);

        setFilteredOrganizations(result);
      }

      if (filterMethod === "search") {
        const filteredData = organizations.filter(org => {
          return Object.keys(org).some(
            key =>
              org[key] &&
              org[key]
                .toString()
                .toLowerCase()
                .includes(filterValue)
          );
        });
        setFilteredOrganizations(filteredData);
      }
    }
  };

  return (
    <section className="organization-filter">
      <div style={{ padding: "0 1.3rem" }}>
        <p>
          <strong>Filter</strong>
        </p>
      </div>
      <Row style={{ padding: "0 1.3rem 1.3rem" }}>
        <Col span={24}>
          <Form layout="vertical" initialValues={{ state_filter: state }}>
            <Row gutter={[16, 16]}>
              {!state && (
                <Col xs={24} sm={24} md={12} lg={12}>
                  <FormItem name="search_filter">
                    <Input
                      onChange={e => {
                        let input = e.target.value.toString().toLowerCase();

                        filterOrganizations(input, "search");
                      }}
                      placeholder="Search Companies By Name"
                      prefix={<SearchIconLeft />}
                      disabled={isOrganizationLoading}
                    />
                  </FormItem>
                </Col>
              )}

              <Col xs={24} sm={24} md={12} lg={6}>
                <FormItem name="state_filter">
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
                    onSelect={(val: string) => {
                      filterOrganizations(val, "state");
                    }}
                    filterOption={(input, option) =>
                      option.value.toLowerCase().indexOf(input.toLowerCase()) >=
                      0
                    }
                    disabled={isOrganizationLoading}
                  >
                    {states.map((state, key) => (
                      <Option key={key} value={state}>
                        {state}
                      </Option>
                    ))}
                  </SelectStyled>
                </FormItem>
              </Col>

              {state && (
                <Col xs={24} sm={24} md={12} lg={6}>
                  <FormItem name="segment_filter">
                    <SelectStyled
                      suffixIcon={<ArrowDown />}
                      showSearch
                      placeholder={
                        <span>
                          <FilterOutlined style={{ marginRight: "1.5rem" }} />
                          Filter By Segments
                        </span>
                      }
                      optionFilterProp="children"
                      onChange={() => {}}
                      onFocus={() => {}}
                      onBlur={() => {}}
                      onSelect={(val: string) => {
                        filterOrganizations(val, "state");
                      }}
                      filterOption={(input, option) =>
                        option.value
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      disabled={isOrganizationLoading}
                    >
                      {states.map((state, key) => (
                        <Option key={key} value={state}>
                          {state}
                        </Option>
                      ))}
                    </SelectStyled>
                  </FormItem>
                </Col>
              )}

              <Col xs={24} sm={24} md={12} lg={6}>
                <FormItem name="sector_filter">
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
                    onSelect={(val: string) => {
                      filterOrganizations(val, "sector");
                    }}
                    filterOption={(input, option) =>
                      option.value.toLowerCase().indexOf(input.toLowerCase()) >=
                      0
                    }
                    disabled={isOrganizationLoading}
                  >
                    {sectors.map((sector, key) => (
                      <Option key={key} value={sector.name}>
                        {sector.name}
                      </Option>
                    ))}
                  </SelectStyled>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </section>
  );
};

export default OrganizationFilter;

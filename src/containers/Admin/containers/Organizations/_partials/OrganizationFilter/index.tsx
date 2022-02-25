import React, { FC, useEffect, useState } from "react";
import { Row, Col, Input, Form, Button } from "antd";
import { ReactComponent as ArrowDown } from "../../../../../../static/svg/arrowDown.svg";
import { ReactComponent as FilterOutlined } from "../../../../../../static/svg/filter.svg";
import { ReactComponent as SearchIconLeft } from "../../../../../../static/svg/SearchIconLeft.svg";
import { SelectStyled } from "../../../../../Styles";
import { IOrganizationProps } from "../../../../../../context/Organization/types";
import { ISectorProps } from "../../../../../../context/Sector/types";
import { capitalize } from "../../../Dashboard/functions";
import states from "../../../../../../states.json";
import CustomSelect from "../../../../../../components/customSelect";

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
  sector?: string;
}

type IFilterOption = "name" | "state" | "sector" | "role" | "search";

const OrganizationFilter: FC<IOrganizationFilterProps> = ({
  isOrganizationLoading,
  organizations,
  setFilteredOrganizations,
  state,
  sectors,
  sector,
}) => {
  const [filter, setFilter] = useState<IFilterOption | null>(null);
  const [currentFilterResult, setCurrentFilterResult] = useState<
    IOrganizationProps[]
  >([]);

  const [form] = Form.useForm();

  useEffect(() => {
    if (state) {
      const result = organizations
        .map(organization => organization)
        .filter(
          organization =>
            organization.state.toLowerCase() === state.toLowerCase()
        );

      setFilteredOrganizations(result);

      form.setFieldsValue({ state_filter: capitalize(state) });
    }

    if (sector) {
      const result = organizations
        .map(organization => organization)
        .filter(
          organization =>
            organization.sector_name.toLowerCase() === sector.toLowerCase()
        );

      // console.log({ result });

      setCurrentFilterResult(result);

      setTimeout(() => {
        setFilteredOrganizations(result);
      }, 1000);
    }
  }, [state, organizations, setFilteredOrganizations, form, sector]);

  const clearFilters = () => {
    setFilter(null);
    form.resetFields();
    setFilteredOrganizations(organizations);
  };

  const filterOrganizations = (
    filterValue: string,
    filterMethod: IFilterOption
  ) => {
    if (filterValue === "") {
      return;
    } else {
      if (filterMethod === "state") {
        if (filter === "search" || filter === "sector" || filter === "role") {
          const result = currentFilterResult
            .map(organization => organization)
            .filter(
              organization =>
                organization.state.toLowerCase() === filterValue.toLowerCase()
            );

          setCurrentFilterResult(result);
          setFilteredOrganizations(result);
        } else {
          const result = organizations
            .map(organization => organization)
            .filter(
              organization =>
                organization.state.toLowerCase() === filterValue.toLowerCase()
            );

          setFilteredOrganizations(result);
          setCurrentFilterResult(result);
          // console.log({ result });
        }
      }

      if (filterMethod === "sector") {
        if (filter === "search" || filter === "state" || filter === "role") {
          const result = currentFilterResult
            .map(organization => organization)
            .filter(
              organization =>
                organization.sector_name.toLowerCase() ===
                filterValue.toLowerCase()
            );

          setCurrentFilterResult(result);
          setFilteredOrganizations(result);
        } else {
          const result = organizations
            .map(organization => organization)
            .filter(
              organization =>
                organization.sector_name.toLowerCase() ===
                filterValue.toLowerCase()
            );

          setCurrentFilterResult(result);
          setFilteredOrganizations(result);
        }
      }

      if (filterMethod === "role") {
        const isEcosystem = filterValue.toLowerCase() === "ecosystem player";
        const isEnterpreneur = filterValue.toLowerCase() === "enterpreneur";

        if (filter === "search" || filter === "state" || filter === "sector") {
          if (isEcosystem) {
            const result = currentFilterResult
              .map(organization => organization)
              .filter(organization => organization.is_ecosystem);

            setCurrentFilterResult(result);
            setFilteredOrganizations(result);
          }

          if (isEnterpreneur) {
            const result = currentFilterResult
              .map(organization => organization)
              .filter(organization => organization.is_entrepreneur);

            setCurrentFilterResult(result);
            setFilteredOrganizations(result);
          }
        } else {
          if (isEcosystem) {
            const result = organizations
              .map(organization => organization)
              .filter(organization => organization.is_ecosystem);

            setCurrentFilterResult(result);
            setFilteredOrganizations(result);
          }

          if (isEnterpreneur) {
            const result = organizations
              .map(organization => organization)
              .filter(organization => organization.is_entrepreneur);

            setCurrentFilterResult(result);
            setFilteredOrganizations(result);
          }
        }
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

        setCurrentFilterResult(filteredData);
        setFilteredOrganizations(filteredData);
      }
    }
  };

  return (
    <section className="organization-filter">
      <div style={{ padding: "0 1.3rem" }}>
        <p
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <strong>Filter</strong>

          {filter && (
            <Button onClick={() => clearFilters()}>Clear Filters</Button>
          )}
        </p>
      </div>

      <Row
        gutter={[16, 8]}
        className="m-0"
        style={{ padding: "0 1.3rem 1.3rem", margin: 0 }}
      >
        <Col span={24} className="p-0">
          <Form
            layout="vertical"
            form={form}
            // initialValues={{
            //   state_filter: capitalize(state),
            //   sector_filter: capitalize(sector),
            // }}
          >
            <Row gutter={[16, 16]}>
              {!state && (
                <Col xs={24} sm={24} md={12} lg={6}>
                  <FormItem style={{ marginBottom: 0 }} name="search_filter">
                    <Input
                      onChange={e => {
                        let input = e.target.value.toString().toLowerCase();
                        setFilter("search");

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
                <FormItem style={{ marginBottom: 0 }} name="state_filter">
                  <CustomSelect
                    suffixIcon={<ArrowDown />}
                    prefixIcon={<FilterOutlined />}
                    placeholder="Filter By States"
                    onSelect={(val: string) => {
                      setFilter("state");
                      filterOrganizations(val, "state");
                    }}
                    // optionFilterProp="children"
                    // filterOption={(input, option) =>
                    //   option.value.toLowerCase().indexOf(input.toLowerCase()) >=
                    //   0
                    // }
                    disabled={isOrganizationLoading}
                  >
                    {states.map((state, key) => (
                      <Option key={key} value={state.name}>
                        {state.name}
                      </Option>
                    ))}
                  </CustomSelect>
                </FormItem>
              </Col>

              <Col style={{ marginBottom: 0 }} xs={24} sm={24} md={12} lg={6}>
                <FormItem style={{ marginBottom: 0 }} name="sector_filter">
                  <CustomSelect
                    suffixIcon={<ArrowDown />}
                    prefixIcon={<FilterOutlined />}
                    placeholder="Filter By Sectors"
                    onSelect={(val: string) => {
                      setFilter("sector");

                      filterOrganizations(val, "sector");
                    }}
                    disabled={isOrganizationLoading}
                  >
                    {sectors.map((sector, key) => (
                      <Option key={key} value={sector.name}>
                        {sector.name}
                      </Option>
                    ))}
                  </CustomSelect>
                </FormItem>
              </Col>

              <Col style={{ marginBottom: 0 }} xs={24} sm={24} md={12} lg={6}>
                <FormItem
                  style={{ marginBottom: 0 }}
                  name="business_role_filter"
                >
                  <CustomSelect
                    suffixIcon={<ArrowDown />}
                    prefixIcon={<FilterOutlined />}
                    placeholder="Filter By Business Role"
                    onSelect={(val: string) => {
                      setFilter("role");

                      filterOrganizations(val, "role");
                    }}
                    disabled={isOrganizationLoading}
                  >
                    {["Enterpreneur", "Ecosystem Player"].map((player, key) => (
                      <Option key={key} value={player.toLowerCase()}>
                        {player}
                      </Option>
                    ))}
                  </CustomSelect>
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

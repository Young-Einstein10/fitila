import React from "react";
import { Button, Col, Row, Table, Skeleton } from "antd";
import { Link } from "react-router-dom";
import { Cards } from "../../../../components/cards/frame/cards-frame";
import { PageHeader } from "../../../../components/page-headers/page-headers";
import { Main } from "../../../AuthLayout/styled";
import { AdminSectionWrapper } from "../../styled";
import { NavLink } from "react-router-dom";
import { createDataSource, createTableColumns } from "../helpers";
import { useOrganizationContext } from "../../../../context";
import { RowStyled } from "../Dashboard/styled";
import { capitalize } from "../../../../utils/helpers";

const cardHeader = (
  <div>
    <span>Newly Added</span>
  </div>
);

const States = () => {
  const {
    isLoading: isOrganizationLoading,
    data: organizations,
    states,
  } = useOrganizationContext();

  const statesData = states.slice(0, 11).map((state, idx) => {
    let organizationList = organizations.filter(
      org => org.state.toLowerCase() === state.toLowerCase()
    );

    return {
      id: idx + 1,
      name: capitalize(state),
      organizations: organizationList.length,
    };
  });

  // const statesData = [
  //   {
  //     id: 1,
  //     name: "Lagos",
  //     organizations: 40,
  //   },
  //   {
  //     id: 2,
  //     name: "Abuja",
  //     organizations: 40,
  //   },
  //   {
  //     id: 3,
  //     name: "Kano",
  //     organizations: 40,
  //   },
  //   {
  //     id: 4,
  //     name: "Ogun",
  //     organizations: 40,
  //   },
  //   {
  //     id: 5,
  //     name: "Kaduna",
  //     organizations: 40,
  //   },
  //   {
  //     id: 6,
  //     name: "Lagos",
  //     organizations: 40,
  //   },
  //   {
  //     id: 7,
  //     name: "Lagos",
  //     organizations: 40,
  //   },
  //   {
  //     id: 8,
  //     name: "Lagos",
  //     organizations: 40,
  //   },
  //   {
  //     id: 9,
  //     name: "Lagos",
  //     organizations: 40,
  //   },
  //   {
  //     id: 10,
  //     name: "Lagos",
  //     organizations: 40,
  //   },
  //   {
  //     id: 11,
  //     name: "Lagos",
  //     organizations: 40,
  //   },
  // ];

  return (
    <AdminSectionWrapper>
      <div>
        <PageHeader
          title="Gain credible insights into Nigeria’s most thriving Organizations"
          buttons={[
            <div key="1" className="page-header-actions">
              <Button size="large" type="primary">
                <NavLink to="/business">List Your Business</NavLink>
              </Button>
            </div>,
          ]}
        />
      </div>

      <Main>
        <Row gutter={24} style={{ marginTop: "2rem" }}>
          <Col xs={24}>
            {isOrganizationLoading ? (
              <Cards headless>
                <Skeleton active />
              </Cards>
            ) : (
              <Cards title="Explore by States" size="large">
                <RowStyled>
                  {statesData.map((state, i) => (
                    <Link
                      className={`cell cell--${i + 1}`}
                      key={state.id}
                      to={`/d/organizations/${state.name}`}
                    >
                      <div>
                        <p>{state.name}</p>
                        <span>{state.organizations} Organizations</span>
                      </div>
                    </Link>
                  ))}
                </RowStyled>
              </Cards>
            )}
          </Col>
        </Row>

        <Row gutter={15}>
          <Col xs={24}>
            <Cards title={cardHeader}>
              <Table
                className="table-responsive"
                dataSource={createDataSource(organizations)}
                columns={createTableColumns()}
                loading={isOrganizationLoading}
              />
            </Cards>
          </Col>
        </Row>
      </Main>
    </AdminSectionWrapper>
  );
};

export default States;

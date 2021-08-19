import React, { FC, useState } from "react";
import { Col, Row, Table } from "antd";
import { Cards } from "../../../../../../components/cards/frame/cards-frame";
import { IUserProfileProps } from "../../../../../../context/Api/auth";
import columns from "./functions";
import ViewOrganizationModal from "./_partials/ViewOrganizationModal";
import EditListedOrganization from "./_partials/EditListedOrganization";
import { useOrganizationContext } from "../../../../../../context";

interface IActivityProps {
  isLoading: boolean;
  userData: IUserProfileProps;
}

const Activity: FC<IActivityProps> = ({ isLoading, userData }) => {
  const [
    isViewOrganizationModalOpen,
    setIsViewOrganizationModalOpen,
  ] = useState(false);
  const [
    isEditOrganizationModalOpen,
    setIsEditOrganizationModalOpen,
  ] = useState(false);
  const [currentOrganization, setCurrentOrganization] = useState(null);

  const {
    data: organizations,
    isLoading: isOrganizationLoading,
  } = useOrganizationContext();

  const toggleViewOrganizationModal = () =>
    setIsViewOrganizationModalOpen(open => !open);

  const toggleEditOrganizationModal = () =>
    setIsEditOrganizationModalOpen(open => !open);

  const dataSource = userData
    ? userData.user_organization.map((org, key) => {
        const filteredOrg = organizations.find(({ id }) => org.id === id);

        if (filteredOrg) {
          return {
            ...filteredOrg,
            ...org,
            key: filteredOrg.id,
            rank: key + 1,
            status: org.is_approved ? "Approved" : "Declined",
            company: filteredOrg.name,
            ceo_name: {
              name: filteredOrg.ceo_name,
              avatar: filteredOrg.ceo_image_url,
            },
            state: filteredOrg.state,
            sectors: filteredOrg.sector_name || filteredOrg.sector,
            market_cap: filteredOrg.market_cap,
            employees: filteredOrg.num_of_employees,
            funding: filteredOrg.funding,
            id: filteredOrg.id,
          };
        }

        return {
          ...org,
          key: org.id,
          rank: key + 1,
          status: org.is_approved ? "Approved" : "Declined",
          company: org.name,
          ceo_name: {
            name: org.ceo_name,
            avatar: org.ceo_image_url,
          },
          state: org.state,
          sectors: org.sector_name || org.sector,
          market_cap: org.market_cap,
          employees: org.num_of_employees,
          funding: org.funding,
          id: org.id,
        };
      })
    : [];

  return (
    <Row gutter={15}>
      <Col xs={24}>
        <Cards
          loading={isLoading || isOrganizationLoading}
          title="Organizations listed so far"
        >
          <Table
            loading={isLoading || isOrganizationLoading}
            className="table-responsive"
            pagination={false}
            dataSource={dataSource}
            columns={columns({
              toggleViewOrganizationModal,
              setCurrentOrganization,
            })}
          />
        </Cards>
      </Col>

      {isViewOrganizationModalOpen ? (
        <ViewOrganizationModal
          visible={isViewOrganizationModalOpen}
          closeModal={toggleViewOrganizationModal}
          currentOrganization={currentOrganization}
          toggleEditOrganizationModal={toggleEditOrganizationModal}
        />
      ) : null}

      {isEditOrganizationModalOpen ? (
        <EditListedOrganization
          visible={isEditOrganizationModalOpen}
          closeModal={toggleEditOrganizationModal}
          currentOrganization={currentOrganization}
        />
      ) : null}
    </Row>
  );
};

export default Activity;

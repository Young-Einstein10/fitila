import React, { FC } from "react";
import { Col, Row } from "antd";
import { RouteComponentProps } from "react-router-dom";
import SimilarCompanies from "./_partials/SimilarCompanies";
import Contact from "./_partials/Contact";
import Summary from "./_partials/Summary";
import { useOrganizationContext } from "../../../../context";
import { AdminSectionWrapper } from "../../styled";

const Profile: FC<RouteComponentProps> = ({ match }) => {
  const { id: organizationId } = match.params as { id: number };

  const { data: organizations, isLoading } = useOrganizationContext();

  const selectedOrganization = organizations.length
    ? organizations.filter(
        // eslint-disable-next-line eqeqeq
        org => org.id == organizationId
      )
    : [];

  return (
    <AdminSectionWrapper className="company-profile">
      <Row className="company-profile-row" gutter={25}>
        <Col span={24}>
          <Summary
            isLoading={isLoading}
            selectedOrganization={selectedOrganization}
          />

          {selectedOrganization[0] && (
            <Contact
              isLoading={isLoading}
              selectedOrganization={selectedOrganization[0]}
            />
          )}

          <SimilarCompanies
            isLoading={isLoading}
            selectedOrganization={selectedOrganization[0]}
          />
        </Col>
      </Row>
    </AdminSectionWrapper>
  );
};

export default Profile;

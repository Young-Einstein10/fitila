import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import { Col, Row, Table } from "antd";
import { Cards } from "../../../../../../components/cards/frame/cards-frame";
import { createDataSource, createTableColumns } from "../../../helpers";
import { IOrganizationProps } from "../../../../../../context/Organization/types";
import { useOrganizationContext } from "../../../../../../context";

interface ISimilarCompaniesProps {
  isLoading: boolean;
  selectedOrganization: IOrganizationProps;
}

const SimilarCompanies: FC<ISimilarCompaniesProps> = ({
  isLoading,
  selectedOrganization,
}) => {
  const { data: organizations } = useOrganizationContext();

  const { pathname } = useLocation();

  const isViewingProfile = pathname.split("/").length >= 4 ? true : false;

  const similarCompanies = organizations?.filter(
    organization =>
      organization.sector === selectedOrganization.sector &&
      organization.id !== selectedOrganization.id
  );

  return (
    <Row gutter={15}>
      <Col xs={24}>
        <Cards
          title={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>Companies in Similar Locations and Sectors</span>
            </div>
          }
        >
          <Table
            loading={isLoading}
            className="table-responsive"
            dataSource={createDataSource(similarCompanies)}
            columns={createTableColumns(
              null,
              null,
              null,
              null,
              isViewingProfile
            )}
          />
        </Cards>
      </Col>
    </Row>
  );
};

export default SimilarCompanies;

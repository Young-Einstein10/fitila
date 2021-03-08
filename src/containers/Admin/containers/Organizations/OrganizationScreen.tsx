import React, { FC, useState, useEffect } from "react";
import { NavLink, RouteComponentProps, useParams } from "react-router-dom";
import { Button, Row, Modal, Col, Table } from "antd";
import FeatherIcon from "feather-icons-react";
import { PageHeader } from "../../../../components/page-headers/page-headers";
import { AdminSectionWrapper } from "../../styled";
import { Main } from "../../../AuthLayout/styled";
import { Cards } from "../../../../components/cards/frame/cards-frame";
import { createDataSource, createTableColumns } from "../helpers";
import { useOrganizationContext } from "../../../../context";
import OrganizationFilter from "./_partials/OrganizationFilter";
import { IOrganizationProps } from "../../../../context/Organization/types";
import EditOrganizationModal from "./_partials/EditOrganizationModal";
import CSVUploadModal from "./_partials/CSVUploadModal";

const content = (
  <>
    <NavLink to="#">
      <FeatherIcon size={16} icon="printer" />
      <span>Printer</span>
    </NavLink>
    <NavLink to="#">
      <FeatherIcon size={16} icon="book-open" />
      <span>PDF</span>
    </NavLink>
    <NavLink to="#">
      <FeatherIcon size={16} icon="file-text" />
      <span>Google Sheets</span>
    </NavLink>
    <NavLink to="#">
      <FeatherIcon size={16} icon="x" />
      <span>Excel (XLSX)</span>
    </NavLink>
    <NavLink to="#">
      <FeatherIcon size={16} icon="file" />
      <span>CSV</span>
    </NavLink>
  </>
);

const OrganizationScreen: FC<RouteComponentProps> = ({ location }) => {
  const [
    isEditOrganizationModalOpen,
    setIsEditOrganizationModalOpen,
  ] = useState(false);
  const [isCSVUploadModalOpen, setIsCSVUploadModalOpen] = useState(false);
  const [currentOrganization, setCurrentOrganization] = useState(null);
  const [filteredOrganizations, setFilteredOrganizations] = useState<
    IOrganizationProps[]
  >([]);

  const { state } = useParams() as any;

  let isAdmin = true;

  const isOrganizationRoute = location.pathname === "/d/organizations";

  const {
    isLoading: isOrganizationLoading,
    data: organizations,
    states,
    sectors,
  } = useOrganizationContext();

  useEffect(() => {
    if (!state && organizations.length) {
      setFilteredOrganizations(organizations);
    }
  }, [organizations, state]);

  const handleDelete = organizationId => {
    if (organizationId) {
      Modal.confirm({
        title: "Are you sure?",
        onOk: () => {
          console.log("Yes");
        },
        onCancel: () => {
          console.log("No");
        },
      });
    }
  };

  const handleEdit = currentOrganization => {
    console.log(currentOrganization);
    setCurrentOrganization(currentOrganization);
    toggleEditModal();
  };

  const toggleEditModal = () => setIsEditOrganizationModalOpen(open => !open);

  const toggleCSVUploadModal = () => setIsCSVUploadModalOpen(open => !open);

  return (
    <AdminSectionWrapper className="organizations">
      <div>
        <PageHeader
          title="Organizations"
          buttons={[
            <div key="1" className="page-header-actions">
              <Button
                size="large"
                type="primary"
                style={{ marginRight: "1rem" }}
                onClick={toggleCSVUploadModal}
              >
                Bulk Upload (CSV)
              </Button>
              <Button size="large" type="primary">
                <NavLink to="/business">List Your Business</NavLink>
              </Button>
            </div>,
          ]}
          style={{
            background: "none",
          }}
        />

        <OrganizationFilter
          isOrganizationLoading={isOrganizationLoading}
          organizations={organizations}
          setFilteredOrganizations={setFilteredOrganizations}
          states={states}
          sectors={sectors}
          state={state}
        />
      </div>

      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <Cards
              title={
                <div>
                  <span>Organizations</span>
                </div>
              }
              more={content}
            >
              <Table
                className="table-responsive"
                dataSource={createDataSource(filteredOrganizations)}
                columns={createTableColumns(
                  handleEdit,
                  handleDelete,
                  isAdmin,
                  isOrganizationRoute
                )}
                loading={isOrganizationLoading}
              />
            </Cards>
          </Col>
        </Row>
      </Main>

      {isEditOrganizationModalOpen ? (
        <EditOrganizationModal
          visible={isEditOrganizationModalOpen}
          closeModal={toggleEditModal}
          currentOrganization={currentOrganization}
        />
      ) : null}

      {isCSVUploadModalOpen ? (
        <CSVUploadModal
          visible={isCSVUploadModalOpen}
          closeModal={toggleCSVUploadModal}
        />
      ) : null}
    </AdminSectionWrapper>
  );
};

export default OrganizationScreen;

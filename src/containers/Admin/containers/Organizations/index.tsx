import React, { FC, useState, useEffect } from "react";
import { NavLink, RouteComponentProps, useParams } from "react-router-dom";
import { Button, Row, Modal, Col, Table } from "antd";
import { PageHeader } from "../../../../components/page-headers/page-headers";
import { AdminSectionWrapper } from "../../styled";
import { Main } from "../../../AuthLayout/styled";
import { Cards } from "../../../../components/cards/frame/cards-frame";
import { createDataSource, createTableColumns } from "../helpers";
import {
  useApiContext,
  useAuthContext,
  useOrganizationContext,
  useSectorContext,
} from "../../../../context";
import OrganizationFilter from "./_partials/OrganizationFilter";
import { IOrganizationProps } from "../../../../context/Organization/types";
import EditOrganizationModal from "./_partials/EditOrganizationModal";
import CSVUploadModal from "./_partials/CSVUploadModal";
import { UploadOutlined } from "@ant-design/icons";
import BulkDeleteModal from "./_partials/BulkDeleteModal";

const Organization: FC<RouteComponentProps> = ({ location }) => {
  const [
    isEditOrganizationModalOpen,
    setIsEditOrganizationModalOpen,
  ] = useState(false);
  const [isCSVUploadModalOpen, setIsCSVUploadModalOpen] = useState(false);
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [currentOrganization, setCurrentOrganization] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [filteredOrganizations, setFilteredOrganizations] = useState<
    IOrganizationProps[]
  >([]);

  const { state } = useParams() as any;

  const isOrganizationRoute = location.pathname === "/d/organizations";

  const {
    isLoading: isOrganizationLoading,
    data: organizations,
    states,
    // sectors,
    refetchOrganizations,
  } = useOrganizationContext();

  const { data: sectors } = useSectorContext();

  const { organization: api } = useApiContext();

  const { auth } = useAuthContext();

  useEffect(() => {
    if (!state && organizations.length) {
      setFilteredOrganizations(organizations);
    }
  }, [organizations, state]);

  const handleDelete = organizationId => {
    if (organizationId) {
      Modal.confirm({
        title: "Are you sure?",
        onOk: async () => {
          await deleteOrganization(organizationId);
        },
        onCancel: () => {
          console.log("No");
        },
      });
    }
  };

  const deleteOrganization = async id => {
    try {
      const res = await api.deleteOrganization(id);

      if (res.status === 204) {
        Modal.success({
          title: "Organization deleted successfully",
          onOk: () => refetchOrganizations(),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = currentOrganization => {
    console.log(currentOrganization);
    setCurrentOrganization(currentOrganization);
    toggleEditModal();
  };

  const handleBulkDelete = () => {
    Modal.confirm({
      title: "Are You Sure you want to delete the selected organizations?",
      onOk: () => toggleBulkDeleteModal(),
    });
  };

  const toggleBulkDeleteModal = () => setIsBulkDeleteModalOpen(open => !open);

  const toggleEditModal = () => setIsEditOrganizationModalOpen(open => !open);

  const toggleCSVUploadModal = () => setIsCSVUploadModalOpen(open => !open);

  const onSelectChange = selectedRowKeys => setSelectedRowKeys(selectedRowKeys);

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <AdminSectionWrapper className="organizations">
      <div>
        <PageHeader
          title={state ? `Organizations in ${state}` : `Organizations`}
          buttons={[
            <div key="1" className="page-header-actions">
              {auth.isAuthenticated && (
                <Button
                  size="large"
                  type="primary"
                  style={{ marginRight: "1rem" }}
                  onClick={toggleCSVUploadModal}
                  icon={<UploadOutlined />}
                  loading={isUploading}
                >
                  Bulk Upload (CSV)
                </Button>
              )}
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
          {auth.isAuthenticated && selectedRowKeys.length ? (
            <Col xs={24}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: "2rem 0",
                }}
              >
                <span>
                  {hasSelected
                    ? `Selected ${selectedRowKeys.length} items`
                    : ""}
                </span>

                <Button
                  danger
                  disabled={!selectedRowKeys.length}
                  onClick={() => handleBulkDelete()}
                >
                  Delete
                </Button>
              </div>
            </Col>
          ) : null}

          <Col xs={24}>
            <Cards
              title={
                <div>
                  <span>Organizations</span>
                </div>
              }
            >
              <Table
                className="table-responsive"
                rowSelection={auth.isAuthenticated ? rowSelection : null}
                dataSource={createDataSource(filteredOrganizations)}
                columns={createTableColumns(
                  handleEdit,
                  handleDelete,
                  auth.isAuthenticated,
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

      {isBulkDeleteModalOpen ? (
        <BulkDeleteModal
          visible={isBulkDeleteModalOpen}
          closeModal={toggleBulkDeleteModal}
          selectedOrganizations={selectedRowKeys}
        />
      ) : null}

      {isCSVUploadModalOpen ? (
        <CSVUploadModal
          visible={isCSVUploadModalOpen}
          closeModal={toggleCSVUploadModal}
          isUploading={isUploading}
          setIsUploading={setIsUploading}
        />
      ) : null}
    </AdminSectionWrapper>
  );
};

export default Organization;

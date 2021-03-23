import React, { Fragment, useState } from "react";
import { Button, Col, Row, Space, Table, Modal } from "antd";
import { PageHeader } from "../../../../components/page-headers/page-headers";
import { useApiContext, useSectorContext } from "../../../../context";
import { Main } from "../../../AuthLayout/styled";
import { AdminSectionWrapper } from "../../styled";
import AddSectorModal from "./_partials/AddSectorModal";
import EditSectorModal from "./_partials/EditSectorModal";
import { Cards } from "../../../../components/cards/frame/cards-frame";
import { DeleteButton, EditButton } from "../helpers";

const Sectors = () => {
  const [isAddSectorModalOpen, setIsAddSectorModalOpen] = useState(false);
  const [isEditSectorModalOpen, setIsEditSectorModalOpen] = useState(false);
  const [currSector, setCurrSector] = useState(null);

  const { sector: api } = useApiContext();
  const { isLoading, data: sectors, refetchSectors } = useSectorContext();

  const toggleAddSectorModal = () => setIsAddSectorModalOpen(open => !open);

  const toggleEditSectorModal = () => setIsEditSectorModalOpen(open => !open);

  const handleDeleteSectorModal = sectorId => {
    Modal.confirm({
      title: "Are You Sure?",
      onOk: async () => {
        await deleteSector(sectorId);
      },
      onCancel: () => {},
    });
  };

  const deleteSector = async id => {
    try {
      const res = await api.deleteSector(id);

      if (res.status === 204) {
        Modal.success({
          title: "Organization deleted successfully",
          onOk: () => refetchSectors(),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns: any = [
    {
      title: "S/N",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Name of Sector",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      align: "center",
      render: (record, key) => {
        return (
          <Space size="middle">
            <Fragment>
              <EditButton
                onClick={() => {
                  setCurrSector(record);
                  toggleEditSectorModal();
                }}
              />
              <DeleteButton
                onClick={() => handleDeleteSectorModal(record.id)}
              />
            </Fragment>
          </Space>
        );
      },
    },
  ];

  return (
    <AdminSectionWrapper>
      <PageHeader
        title="Sectors"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button
              onClick={() => toggleAddSectorModal()}
              size="large"
              type="primary"
            >
              Add Sectors
            </Button>
          </div>,
        ]}
        style={{
          background: "none",
        }}
      />

      <Main>
        <Row>
          <Col span={24}>
            <Cards headless>
              <Table
                className="table-responsive"
                dataSource={sectors.map((sector, key) => {
                  return {
                    ...sector,
                    key: key + 1,
                    name: sector.name,
                  };
                })}
                columns={columns}
                loading={isLoading}
              />
            </Cards>
          </Col>
        </Row>
      </Main>

      {isAddSectorModalOpen ? (
        <AddSectorModal
          visible={isAddSectorModalOpen}
          closeModal={toggleAddSectorModal}
        />
      ) : null}

      {isEditSectorModalOpen ? (
        <EditSectorModal
          visible={isEditSectorModalOpen}
          closeModal={toggleEditSectorModal}
          currSector={currSector}
        />
      ) : null}
    </AdminSectionWrapper>
  );
};

export default Sectors;

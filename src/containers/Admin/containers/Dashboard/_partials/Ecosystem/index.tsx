import React, { Fragment, useState } from "react";
import { Button, Row, Col, Table, Modal, Space } from "antd";
import { PageHeader } from "../../../../../../components/page-headers/page-headers";
import { AdminSectionWrapper } from "../../../../styled";
import { Main } from "../../../../../AuthLayout/styled";
import { Cards } from "../../../../../../components/cards/frame/cards-frame";
import { useApiContext, useEcosystemContext } from "../../../../../../context";
import { EditButton, DeleteButton } from "../../../helpers";
import { capitalize } from "../../functions";
import AddEcosystemModal from "./_partials/AddEcosystemModal";
import EditEcosystemModal from "./_partials/EditEcosystemModal";
import {
  IEcosystemProps,
  ISubclassProps,
  ISubEcosystem,
} from "../../../../../../context/Ecosystem/types";
import ViewEcosystemModal from "./_partials/ViewEcosystemModal";
import AddSubEcosystemModal from "./_partials/AddSubEcosystemModal";
import ViewSubEcosystemModal from "./_partials/ViewSubEcosystemModal";
import AddSubClassModal from "./_partials/AddSubClassModal";
import EditSubEcosystemModal from "./_partials/EditSubEcosystemModal";
import ViewSubClassModal from "./_partials/ViewSubClassModal";
import EditSubClassModal from "./_partials/EditSubClassModal";

const Ecosystem = () => {
  const [isViewEcosystemModalOpen, setIsViewEcosystemModalOpen] = useState(
    false
  );
  const [isAddEcosystemModalOpen, setIsAddEcosystemModalOpen] = useState(false);
  const [isEditEcosystemModalOpen, setIsEditEcosystemModalOpen] = useState(
    false
  );
  const [isAddSubEcosystemModalOpen, setIsAddSubEcosystemModalOpen] = useState(
    false
  );
  const [
    isViewSubEcosystemModalOpen,
    setIsViewSubEcosystemModalOpen,
  ] = useState(false);
  const [isViewSubClassModalOpen, setIsViewSubClassModalOpen] = useState(false);
  const [isAddSubClassModalOpen, setIsAddSubClassModalOpen] = useState(false);
  const [
    isEditSubEcosystemModalOpen,
    setIsEditSubEcosystemModalOpen,
  ] = useState(false);
  const [isEditSubClassModalOpen, setIsEditSubClassModalOpen] = useState(false);
  const [currEcosystem, setCurrEcosystem] = useState<IEcosystemProps>();
  const [currSubEcosystem, setCurrSubEcosystem] = useState<ISubEcosystem>();
  const [currSubClass, setCurrSubClass] = useState<ISubclassProps>();

  const { ecosystem: api } = useApiContext();
  const {
    isLoading,
    data: ecosystems,
    refetchEcosystems,
  } = useEcosystemContext();

  const cardHeader = (
    <div>
      <span>Ecosystem Segments</span>
    </div>
  );

  const handleDeleteEcosystemModal = sectorId => {
    Modal.confirm({
      title: "Are You Sure?",
      onOk: async () => {
        await deleteEcosystem(sectorId);
      },
    });
  };

  const deleteEcosystem = async id => {
    try {
      const res = await api.deleteEcosystem(id);

      if (res.status === 204) {
        refetchEcosystems();

        Modal.success({
          title: "Ecosystem deleted successfully",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleAddEcosystemModal = () =>
    setIsAddEcosystemModalOpen(open => !open);

  const toggleEditEcosystemModal = () =>
    setIsEditEcosystemModalOpen(open => !open);

  const toggleViewEcosystemModal = () =>
    setIsViewEcosystemModalOpen(open => !open);

  const toggleAddSubEcosystemModal = () =>
    setIsAddSubEcosystemModalOpen(open => !open);

  const toggleViewSubEcosystemModal = () =>
    setIsViewSubEcosystemModalOpen(open => !open);

  const toggleEditSubEcosystemModal = () =>
    setIsEditSubEcosystemModalOpen(open => !open);

  const toggleAddSubClassModal = () => setIsAddSubClassModalOpen(open => !open);

  const toggleViewSubClassModal = () =>
    setIsViewSubClassModalOpen(open => !open);

  const toggleEditSubClassModal = () =>
    setIsEditSubClassModalOpen(open => !open);

  const columns: any = [
    {
      title: "S/N",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Name of Ecosystem",
      dataIndex: "name",
      key: "name",
      render: record => <span>{capitalize(record)}</span>,
    },
    {
      title: "Number of Sub-Ecosystems",
      dataIndex: "numOfSubEco",
      key: "numOfSubEco",
      align: "center",
    },
    {
      //   title: "Actions",
      align: "center",
      render: (record, key) => {
        return (
          <Space size="middle">
            <Fragment>
              <EditButton
                onClick={() => {
                  setCurrEcosystem(record);
                  toggleEditEcosystemModal();
                }}
              />
              <DeleteButton
                onClick={() => handleDeleteEcosystemModal(record.id)}
              />
              <Button
                onClick={() => {
                  setCurrEcosystem(record);
                  toggleViewEcosystemModal();
                }}
              >
                View
              </Button>
            </Fragment>
          </Space>
        );
      },
    },
  ];
  return (
    <AdminSectionWrapper>
      <PageHeader
        title="Ecosystem Segments"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button
              onClick={() => toggleAddEcosystemModal()}
              size="large"
              type="primary"
            >
              Add Ecosystem
            </Button>
          </div>,
        ]}
      />

      <Main>
        <Row>
          <Col span={24}>
            <Cards title={cardHeader}>
              <Table
                className="table-responsive"
                dataSource={ecosystems.map((ecosystem, key) => {
                  return {
                    ...ecosystem,
                    key: key + 1,
                    name: ecosystem.name,
                    numOfSubEco: ecosystem.sub_ecosystem.length,
                  };
                })}
                columns={columns}
                loading={isLoading}
              />
            </Cards>
          </Col>
        </Row>
      </Main>

      {isViewEcosystemModalOpen ? (
        <ViewEcosystemModal
          visible={isViewEcosystemModalOpen}
          closeModal={toggleViewEcosystemModal}
          currEcosystem={currEcosystem}
          toggleAddSubEcosystemModal={toggleAddSubEcosystemModal}
          toggleViewSubEcosystemModal={toggleViewSubEcosystemModal}
        />
      ) : null}

      {isAddEcosystemModalOpen ? (
        <AddEcosystemModal
          visible={isAddEcosystemModalOpen}
          closeModal={toggleAddEcosystemModal}
        />
      ) : null}

      {isEditEcosystemModalOpen ? (
        <EditEcosystemModal
          visible={isEditEcosystemModalOpen}
          closeModal={toggleEditEcosystemModal}
          currEcosystem={currEcosystem}
        />
      ) : null}

      {isAddSubEcosystemModalOpen ? (
        <AddSubEcosystemModal
          visible={isAddSubEcosystemModalOpen}
          closeModal={toggleAddSubEcosystemModal}
          currEcosystem={currEcosystem}
        />
      ) : null}

      {isViewSubEcosystemModalOpen ? (
        <ViewSubEcosystemModal
          visible={isViewSubEcosystemModalOpen}
          closeModal={toggleViewSubEcosystemModal}
          currEcosystem={currEcosystem}
          setCurrSubEcosystem={setCurrSubEcosystem}
          toggleEditSubEcosystemModal={toggleEditSubEcosystemModal}
          toggleViewSubClassModal={toggleViewSubClassModal}
          toggleAddSubEcosystemModal={toggleAddSubEcosystemModal}
        />
      ) : null}

      {isAddSubClassModalOpen ? (
        <AddSubClassModal
          visible={isAddSubClassModalOpen}
          closeModal={toggleAddSubClassModal}
          currEcosystem={currEcosystem}
          currSubEcosystem={currSubEcosystem}
        />
      ) : null}

      {isViewSubClassModalOpen ? (
        <ViewSubClassModal
          visible={isViewSubClassModalOpen}
          closeModal={toggleViewSubClassModal}
          currSubEcosystem={currSubEcosystem}
          setCurrSubClass={setCurrSubClass}
          toggleAddSubClassModal={toggleAddSubClassModal}
          toggleEditSubClassModal={toggleEditSubClassModal}
        />
      ) : null}

      {isEditSubEcosystemModalOpen ? (
        <EditSubEcosystemModal
          visible={isEditSubEcosystemModalOpen}
          closeModal={toggleEditSubEcosystemModal}
          currEcosystem={currEcosystem}
          currSubEcosystem={currSubEcosystem}
        />
      ) : null}

      {isEditSubClassModalOpen ? (
        <EditSubClassModal
          visible={isEditSubClassModalOpen}
          closeModal={toggleEditSubClassModal}
          currEcosystem={currEcosystem}
          currSubEcosystem={currSubEcosystem}
          currSubClass={currSubClass}
        />
      ) : null}
    </AdminSectionWrapper>
  );
};

export default Ecosystem;

import React, { FC, Fragment } from "react";
import { Modal, Button, Table, Space } from "antd";
import { IEditEcosystemProps } from "../EditEcosystemModal";
import { capitalize } from "../../../../../../../../utils/helpers";
import { EditButton, DeleteButton } from "../../../../../helpers";
import { ISubEcosystem } from "../../../../../../../../context/Ecosystem/types";
import {
  useApiContext,
  useEcosystemContext,
} from "../../../../../../../../context";

interface IViewSubEcosystemProps extends IEditEcosystemProps {
  setCurrSubEcosystem: React.Dispatch<React.SetStateAction<ISubEcosystem>>;
  toggleViewSubClassModal: () => void;
  toggleEditSubEcosystemModal: () => void;
  toggleAddSubEcosystemModal: () => void;
}

const ViewSubEcosystemModal: FC<IViewSubEcosystemProps> = ({
  visible,
  closeModal,
  currEcosystem,
  setCurrSubEcosystem,
  toggleViewSubClassModal,
  toggleAddSubEcosystemModal,
  toggleEditSubEcosystemModal,
}) => {
  const { ecosystem: api } = useApiContext();
  const { refetchEcosystems } = useEcosystemContext();

  const handleDeleteSubEcosystem = subEcoId => {
    Modal.confirm({
      title: "Are You Sure?",
      onOk: async () => deleteSubEcosystem(subEcoId),
    });
  };

  const deleteSubEcosystem = async id => {
    try {
      const res = await api.deleteSubEcosystem(id);

      if (res.status === 204) {
        refetchEcosystems();

        Modal.success({
          title: "Sub-Ecosystem deleted successfully",
          onOk: () => closeModal(),
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
      title: "Name of Sub-Ecosystem",
      dataIndex: "name",
      key: "name",
      render: record => <span>{capitalize(record)}</span>,
    },
    {
      title: "Number of Sub-Class",
      dataIndex: "numOfSubClass",
      key: "numOfSubClass",
      align: "center",
    },
    {
      //   title: "Actions",
      align: "center",
      render: record => {
        return (
          <Space size="middle">
            <Fragment>
              <EditButton
                onClick={() => {
                  setCurrSubEcosystem(record);
                  toggleEditSubEcosystemModal();
                }}
              />
              <DeleteButton
                onClick={() => handleDeleteSubEcosystem(record.id)}
              />

              <Button
                onClick={() => {
                  setCurrSubEcosystem(record);
                  toggleViewSubClassModal();
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

  const tableData = currEcosystem.sub_ecosystem.length
    ? currEcosystem.sub_ecosystem.map((subEco, i) => ({
        ...subEco,
        name: subEco.name,
        numOfSubClass: subEco.sub_class.length,
        key: i + 1,
      }))
    : [];

  return (
    <Modal
      width={750}
      title={<strong>Sub-Ecosystems under {currEcosystem.name}</strong>}
      visible={visible}
      onCancel={closeModal}
      footer={[
        <Button
          type="primary"
          key="addSubEcosystem"
          onClick={() => toggleAddSubEcosystemModal()}
        >
          Add Sub-Ecosystem
        </Button>,
      ]}
    >
      <Table
        className="table-responsive"
        dataSource={tableData}
        columns={columns}
      />
    </Modal>
  );
};

export default ViewSubEcosystemModal;

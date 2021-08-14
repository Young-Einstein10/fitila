import React, { FC, Fragment } from "react";
import { Modal, Button, Table, Space } from "antd";
import { IEditSubEcosystemProps } from "../EditSubEcosystemModal";
import { capitalize } from "../../../../../../../../utils/helpers";
import { EditButton, DeleteButton } from "../../../../../helpers";
import { ISubclassProps } from "../../../../../../../../context/Ecosystem/types";
import {
  useApiContext,
  useEcosystemContext,
} from "../../../../../../../../context";

interface IViewSubClassProps
  extends Omit<IEditSubEcosystemProps, "currEcosystem"> {
  toggleAddSubClassModal: () => void;
  toggleEditSubClassModal: () => void;
  setCurrSubClass: React.Dispatch<React.SetStateAction<ISubclassProps>>;
}

const ViewSubClassModal: FC<IViewSubClassProps> = ({
  visible,
  closeModal,
  currSubEcosystem,
  setCurrSubClass,
  toggleAddSubClassModal,
  toggleEditSubClassModal,
}) => {
  const { ecosystem: api } = useApiContext();
  const { refetchEcosystems } = useEcosystemContext();

  const handleDeleteSubClass = id => {
    Modal.confirm({
      title: "Are You Sure?",
      onOk: async () => deleteSubClass(id),
    });
  };

  const deleteSubClass = async id => {
    try {
      const res = await api.deleteSubClass(id);

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
      title: "Name of Sub-Class",
      dataIndex: "name",
      key: "name",
      render: record => <span>{capitalize(record)}</span>,
    },
    {
      title: "Actions",
      align: "center",
      render: record => {
        return (
          <Space size="middle">
            <Fragment>
              <EditButton
                onClick={() => {
                  setCurrSubClass(record);
                  toggleEditSubClassModal();
                }}
              />
              <DeleteButton onClick={() => handleDeleteSubClass(record.id)} />
            </Fragment>
          </Space>
        );
      },
    },
  ];

  return (
    <Modal
      title={<strong>View SubClass</strong>}
      visible={visible}
      onCancel={closeModal}
      footer={[
        <Button
          type="primary"
          key="addSubClass"
          onClick={() => toggleAddSubClassModal()}
        >
          Add Sub-Class
        </Button>,
      ]}
    >
      <Table
        className="table-responsive"
        dataSource={currSubEcosystem.sub_class.map((subEco, i) => ({
          ...subEco,
          name: subEco.name,
          key: i + 1,
        }))}
        columns={columns}
      />
    </Modal>
  );
};

export default ViewSubClassModal;

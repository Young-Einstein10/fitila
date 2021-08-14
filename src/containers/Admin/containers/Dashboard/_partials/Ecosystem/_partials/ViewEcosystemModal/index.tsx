import React, { FC } from "react";
import { Modal, Button } from "antd";
import { IEcosystemProps } from "../../../../../../../../context/Ecosystem/types";

interface IViewEcosystemProps {
  visible: boolean;
  closeModal: () => void;
  currEcosystem: IEcosystemProps;
  toggleAddSubEcosystemModal: () => void;
  toggleViewSubEcosystemModal: () => void;
}

const ViewEcosystemModal: FC<IViewEcosystemProps> = ({
  visible,
  closeModal,
  currEcosystem,
  toggleAddSubEcosystemModal,
  toggleViewSubEcosystemModal,
}) => {
  const {
    name,
    num_of_organization,
    num_of_sectors,
    num_of_states,
    sub_ecosystem,
  } = currEcosystem;

  return (
    <Modal
      title={<strong>View Ecosystem Details</strong>}
      visible={visible}
      onCancel={closeModal}
      footer={[
        <Button
          type="primary"
          key="viewSubEcosystem"
          onClick={() => toggleViewSubEcosystemModal()}
        >
          View Sub-Ecosystem
        </Button>,
      ]}
    >
      <div>
        <p>
          <strong>Name</strong>: {name || "-"}
        </p>

        <p>
          <strong>Sub-Ecosystems</strong>: {sub_ecosystem.length || "-"}
        </p>

        <p>
          <strong>Number of Organizations</strong>: {num_of_organization || "-"}
        </p>

        <p>
          <strong>Number of Sectors</strong>: {num_of_sectors || "-"}
        </p>

        <p>
          <strong>Number of States</strong>: {num_of_states || "-"}
        </p>
      </div>
    </Modal>
  );
};

export default ViewEcosystemModal;

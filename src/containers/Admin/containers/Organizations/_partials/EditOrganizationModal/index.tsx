import React from "react";
import { Modal } from "antd";

const EditOrganizationModal = ({
  currentOrganization,
  visible,
  closeModal,
}) => {
  return (
    <Modal visible={visible} onCancel={closeModal} title="Edit Organization">
      <div>Edit Organization Content will be here</div>
    </Modal>
  );
};

export default EditOrganizationModal;

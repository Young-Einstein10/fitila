import React, { FC } from "react";
import { Modal } from "antd";

interface ICSVUploadModalProps {
  visible: boolean;
  closeModal: () => void;
}

const CSVUploadModal: FC<ICSVUploadModalProps> = ({ visible, closeModal }) => {
  return (
    <Modal visible={visible} onCancel={closeModal} title="Edit Organization">
      <div>Upload Component Will be here</div>
    </Modal>
  );
};

export default CSVUploadModal;

import React, { FC, useState } from "react";
import { Modal, Upload, Button } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useApiContext } from "../../../../../../context";

const { Dragger } = Upload;

interface ICSVUploadModalProps {
  visible: boolean;
  closeModal: () => void;
}

const CSVUploadModal: FC<ICSVUploadModalProps> = ({ visible, closeModal }) => {
  const [csvFile, setCsvFile] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const { organization: api } = useApiContext();

  const handleUpload = async () => {
    setIsUploading(true);
    try {
      console.log(csvFile);

      // const res = await api.upload(csvFile);

      // console.log(res.data);
      setIsUploading(false);
    } catch (error) {
      console.log(error);
      setIsUploading(false);
    }
  };

  const props = {
    name: "file",
    onRemove: file => {
      setCsvFile(prevState => {
        const index = prevState.indexOf(file);
        const newFileList = csvFile.slice();
        newFileList.splice(index, 1);
        return [...prevState, newFileList];
      });
    },
    beforeUpload: file => {
      setCsvFile(prevState => [...prevState, file]);
      return false;
    },
    fileList: csvFile,
  };

  return (
    <Modal
      visible={visible}
      onCancel={closeModal}
      title={<strong>Edit Organization</strong>}
      footer={[
        <Button
          key="upload-btn"
          onClick={() => handleUpload()}
          type="primary"
          disabled={csvFile.length === 0}
          loading={isUploading}
        >
          Upload
        </Button>,
      ]}
    >
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Dragger>
    </Modal>
  );
};

export default CSVUploadModal;

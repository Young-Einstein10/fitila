import React, { FC, useState } from "react";
import { Modal, Upload, Button, notification } from "antd";
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

      Modal.info({
        title:
          "Your Upload has started. You will get notification once its completed.",
      });
      closeModal();

      let data = { file: csvFile[0] };

      const formData = new FormData();

      for (const key in data) {
        formData.append(key, data[key]);
      }

      const res = await api.upload(formData);

      console.log(res.data);

      if (res.status === 201) {
        notification.success({
          message: "Upload Completed.",
          placement: "bottomRight",
        });
      }
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
      title={<strong>Upload Organization List</strong>}
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
      <p>
        Ensure CSV Data is in line with provided template.{" "}
        <a
          href="https://drive.google.com/file/d/1WbL5VLe-JzW7tHx37B1lmDLAB-peGef-/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#FF6D00" }}
        >
          Download Template
        </a>
      </p>

      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">Support for a single or bulk upload.</p>
      </Dragger>
    </Modal>
  );
};

export default CSVUploadModal;

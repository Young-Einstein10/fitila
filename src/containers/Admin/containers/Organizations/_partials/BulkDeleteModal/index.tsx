import React, { FC, useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import {
  useApiContext,
  useOrganizationContext,
} from "../../../../../../context";

interface IBulkDeleteProps {
  selectedOrganizations: number[];
  visible: boolean;
  closeModal: () => void;
}

// interface IError {
//   status: string;
//   message: any;
// }

const BulkDeleteModal: FC<IBulkDeleteProps> = ({
  visible,
  closeModal,
  selectedOrganizations,
}) => {
  const [isLoading, setisLoading] = useState(false);

  const [form] = Form.useForm();
  const { organization: api } = useApiContext();
  const { refetchOrganizations } = useOrganizationContext();

  //  if (res.status === 204) {
  //    Modal.success({
  //      title: "Organization deleted successfully",
  //      onOk: () => refetchOrganizations(),
  //    });
  //  }

  const handleDelete = async () => {
    try {
      const values = await form.validateFields();

      if (values.delete !== "delete") {
        Modal.warn({
          title: "Type in delete to confirm",
        });

        return;
      }

      setisLoading(true);

      const requests = selectedOrganizations.map(async id => {
        const res = await api.deleteOrganization(id).catch(err => ({
          status: "error",
          message: err.message,
        }));

        return res;
      });

      const responseList = await Promise.all(requests);

      // console.log(responseList);
      refetchOrganizations();

      responseList.some(res => {
        if (res.status === "error") {
          Modal.error({
            title:
              "An Error Occured during the operation. Some Organizations might not be deleted!",
          });
        }
      });

      responseList.every(res => {
        if (res.status === 204) {
          Modal.success({
            title: "Organization deleted successfully",
            onOk: () => closeModal(),
          });
        }
      });

      setisLoading(false);
    } catch (error) {
      console.log(error);
      setisLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      title={`Delete ${selectedOrganizations.length} Organizations`}
      onCancel={closeModal}
      footer={[
        <Button key="cancel" onClick={closeModal}>
          Cancel
        </Button>,
        <Button
          key="delete"
          type="primary"
          loading={isLoading}
          onClick={handleDelete}
        >
          Delete
        </Button>,
      ]}
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label="Type in delete to confim:"
          name="delete"
          rules={[
            {
              required: true,
              message: "Type in delete to confirm",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BulkDeleteModal;

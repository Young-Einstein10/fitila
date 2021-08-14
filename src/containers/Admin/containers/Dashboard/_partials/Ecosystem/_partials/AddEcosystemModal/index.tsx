import React, { useState } from "react";
import { Button, Form, Modal } from "antd";
import {
  useApiContext,
  useEcosystemContext,
} from "../../../../../../../../context";
import { InputStyled } from "../../../../../../../Styles";

const AddEcosystemModal = ({ visible, closeModal }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();

  const { ecosystem: api } = useApiContext();
  const { refetchEcosystems } = useEcosystemContext();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      setIsLoading(true);

      const res = await api.addEcosystem(values);

      if (res.status === 201) {
        Modal.success({
          title: "Ecosystem added successfully.",
          onOk: async () => {
            await refetchEcosystems();
            closeModal();
          },
        });
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      console.log(error);
    }
  };

  return (
    <Modal
      title={<strong>Add New Ecosystem</strong>}
      visible={visible}
      onCancel={closeModal}
      footer={[
        <Button key="cancel" onClick={closeModal}>
          Cancel
        </Button>,
        <Button
          loading={isLoading}
          key="create"
          type="primary"
          onClick={() => handleSubmit()}
        >
          Add
        </Button>,
      ]}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Name of Ecosystem"
          rules={[{ message: "Please input ecosystem name!", required: true }]}
        >
          <InputStyled />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEcosystemModal;

import React, { useEffect, useState } from "react";
import { Modal, Form, Button } from "antd";
import { InputStyled } from "../../../../../Styles";

const EditSectorModal = ({ visible, closeModal, currSector }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: currSector,
    });
  }, [currSector, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      setIsLoading(true);

      console.log(values);

      setIsLoading(false);

      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title={<strong>Edit Sector</strong>}
      visible={visible}
      onCancel={closeModal}
      footer={[
        <Button key="cancel" onClick={() => closeModal()}>
          Cancel
        </Button>,
        <Button
          loading={isLoading}
          key="create"
          type="primary"
          onClick={() => handleSubmit()}
        >
          Edit
        </Button>,
      ]}
      destroyOnClose
    >
      <Form form={form}>
        <Form.Item
          name="name"
          rules={[{ message: "Please input sector name!", required: true }]}
        >
          <InputStyled placeholder="Name of Sector" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditSectorModal;

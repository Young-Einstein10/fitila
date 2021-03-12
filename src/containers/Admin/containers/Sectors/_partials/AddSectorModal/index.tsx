import React, { useState } from "react";
import { Modal, Form, Button } from "antd";
import { InputStyled } from "../../../../../Styles";

const AddSectorModal = ({ visible, closeModal }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      setIsLoading(true);

      console.log(values);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title={<strong>Add Sectors</strong>}
      visible={visible}
      onCancel={closeModal}
      footer={[
        <Button key="cancel">Cancel</Button>,
        <Button
          loading={isLoading}
          key="create"
          type="primary"
          onClick={() => handleSubmit()}
        >
          Create
        </Button>,
      ]}
      destroyOnClose
    >
      <Form>
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

export default AddSectorModal;

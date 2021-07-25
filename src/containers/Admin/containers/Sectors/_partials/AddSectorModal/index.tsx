import React, { useState } from "react";
import { Modal, Form, Button } from "antd";
import { InputStyled } from "../../../../../Styles";
import { useApiContext, useSectorContext } from "../../../../../../context";

const AddSectorModal = ({ visible, closeModal }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();

  const { sector: api } = useApiContext();
  const { refetchSectors } = useSectorContext();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      setIsLoading(true);

      const res = await api.addSector(values);

      if (res.status === 201) {
        Modal.success({
          title: "Added Sector Successfully",
          onOk: async () => {
            await refetchSectors();
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
      title={<strong>Add Sectors</strong>}
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
          label="Name of Sector"
          rules={[{ message: "Please input sector name!", required: true }]}
        >
          <InputStyled />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddSectorModal;

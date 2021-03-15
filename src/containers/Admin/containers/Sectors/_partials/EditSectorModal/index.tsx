import React, { FC, useEffect, useState } from "react";
import { Modal, Form, Button } from "antd";
import { InputStyled } from "../../../../../Styles";
import { useApiContext, useSectorContext } from "../../../../../../context";
import { ISectorProps } from "../../../../../../context/Sector/types";

interface IEditSectorProps {
  visible: boolean;
  closeModal: () => void;
  currSector: ISectorProps;
}

const EditSectorModal: FC<IEditSectorProps> = ({
  visible,
  closeModal,
  currSector,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();

  const { sector: api } = useApiContext();

  const { refetchSectors } = useSectorContext();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      setIsLoading(true);

      const res = await api.editSector(currSector.id, values);

      if (res.status === 201) {
        Modal.success({
          title: "Sector Edited Successfully",
          onOk: () => refetchSectors(),
        });
      }

      setIsLoading(false);

      closeModal();
    } catch (error) {
      setIsLoading(false);

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
      <Form
        form={form}
        initialValues={{
          name: currSector.name,
        }}
      >
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

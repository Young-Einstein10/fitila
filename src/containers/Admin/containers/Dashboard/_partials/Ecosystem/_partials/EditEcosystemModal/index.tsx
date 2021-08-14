import React, { FC, useState } from "react";
import { Modal, Form, Button } from "antd";
import { IEcosystemProps } from "../../../../../../../../context/Ecosystem/types";
import {
  useApiContext,
  useEcosystemContext,
} from "../../../../../../../../context";
import { InputStyled } from "../../../../../../../Styles";

export interface IEditEcosystemProps {
  visible: boolean;
  closeModal: () => void;
  currEcosystem: IEcosystemProps;
}

const EditEcosystemModal: FC<IEditEcosystemProps> = ({
  visible,
  closeModal,
  currEcosystem,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();

  const { ecosystem: api } = useApiContext();

  const { refetchEcosystems } = useEcosystemContext();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      setIsLoading(true);

      const res = await api.editEcosystem(currEcosystem.id, values);

      if (res.status === 201) {
        setIsLoading(false);
        refetchEcosystems();
        Modal.success({
          title: "Ecosystem edited successfully",
          onOk: () => closeModal(),
        });
      }
    } catch (error) {
      setIsLoading(false);

      console.log(error);
    }
  };

  return (
    <Modal
      title={<strong>Edit Ecosystem</strong>}
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
          name: currEcosystem.name,
        }}
      >
        <Form.Item
          name="name"
          rules={[{ message: "Please input ecosystem name!", required: true }]}
        >
          <InputStyled placeholder="Name of Sector" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditEcosystemModal;
